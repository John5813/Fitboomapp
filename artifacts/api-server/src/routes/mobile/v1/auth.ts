import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, otpCodesTable } from "@workspace/db/schema";
import { eq, and, gt } from "drizzle-orm";
import {
  signTokenPair,
  signAccessToken,
  verifyRefreshToken,
  generateOtp,
  generateTelegramCode,
} from "../../../lib/auth";
import { sendOtpSms } from "../../../lib/sms";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

function successResp(res: any, data: any, status = 200) {
  return res.status(status).json({ success: true, data });
}

function errorResp(res: any, error: string, status = 400) {
  return res.status(status).json({ success: false, error });
}

function formatUser(user: any) {
  return {
    id: String(user.id),
    phone: user.phone,
    name: user.name ?? null,
    age: user.age ?? null,
    gender: user.gender ?? null,
    profileImageUrl: user.profileImageUrl ?? null,
    credits: user.credits ?? 0,
    creditExpiryDate: user.creditExpiryDate ?? null,
    isAdmin: user.isAdmin ?? false,
    profileCompleted: user.profileCompleted ?? false,
  };
}

router.post("/sms/send", async (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.replace(/\D/g, "").length < 9) {
    return errorResp(res, "Telefon raqam noto'g'ri");
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await db.insert(otpCodesTable).values({ phone, code, expiresAt });

  try {
    await sendOtpSms(phone, code);
  } catch (err: any) {
    console.error("[SMS Error]", err?.message);
    return errorResp(res, "SMS yuborishda xatolik. Qayta urinib ko'ring.", 500);
  }

  return successResp(res, { message: "SMS yuborildi" });
});

router.post("/sms/verify", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return errorResp(res, "Telefon va kod talab qilinadi");
  }

  const now = new Date();
  const [otp] = await db
    .select()
    .from(otpCodesTable)
    .where(
      and(
        eq(otpCodesTable.phone, phone),
        eq(otpCodesTable.code, code),
        eq(otpCodesTable.used, false),
        gt(otpCodesTable.expiresAt, now)
      )
    )
    .orderBy(otpCodesTable.createdAt)
    .limit(1);

  if (!otp) {
    return errorResp(res, "Kod noto'g'ri yoki muddati o'tgan");
  }

  await db.update(otpCodesTable).set({ used: true }).where(eq(otpCodesTable.id, otp.id));

  let [user] = await db.select().from(usersTable).where(eq(usersTable.phone, phone)).limit(1);
  const isNewUser = !user;

  if (!user) {
    const [newUser] = await db.insert(usersTable).values({ phone, credits: 0 }).returning();
    user = newUser;
  }

  const tokens = signTokenPair({ userId: user.id, phone: user.phone });

  return successResp(res, {
    ...tokens,
    isNewUser,
    user: formatUser(user),
  });
});

router.post("/telegram/verify", async (req, res) => {
  const { code } = req.body;
  if (!code || code.length < 6) {
    return errorResp(res, "Telegram kodi noto'g'ri");
  }

  const now = new Date();
  const [otp] = await db
    .select()
    .from(otpCodesTable)
    .where(
      and(
        eq(otpCodesTable.code, code.toUpperCase()),
        eq(otpCodesTable.used, false),
        gt(otpCodesTable.expiresAt, now)
      )
    )
    .orderBy(otpCodesTable.createdAt)
    .limit(1);

  if (!otp) {
    return errorResp(res, "Kod noto'g'ri yoki muddati o'tgan");
  }

  await db.update(otpCodesTable).set({ used: true }).where(eq(otpCodesTable.id, otp.id));

  let [user] = await db.select().from(usersTable).where(eq(usersTable.phone, otp.phone)).limit(1);
  const isNewUser = !user;

  if (!user) {
    const [newUser] = await db
      .insert(usersTable)
      .values({ phone: otp.phone, credits: 0 })
      .returning();
    user = newUser;
  }

  const tokens = signTokenPair({ userId: user.id, phone: user.phone });

  return successResp(res, {
    ...tokens,
    isNewUser,
    user: formatUser(user),
  });
});

router.post("/telegram/send", async (req, res) => {
  const { chatId } = req.body;
  if (!chatId) {
    return errorResp(res, "chatId talab qilinadi");
  }

  const TELEGRAM_BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"];
  if (!TELEGRAM_BOT_TOKEN) {
    return errorResp(res, "Telegram bot sozlanmagan", 503);
  }

  const code = generateTelegramCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  const phone = `tg:${chatId}`;

  await db.insert(otpCodesTable).values({ phone, code, expiresAt });

  const message = `FitBoom tasdiqlash kodi:\n\n<b>${code}</b>\n\nBu kodni ilovaga kiriting. 10 daqiqa amal qiladi.`;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  });

  return successResp(res, { message: "Kod Telegram ga yuborildi" });
});

router.post("/complete-profile", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { name, age, gender } = req.body;

  if (!name || name.trim().length < 2) {
    return errorResp(res, "Ism kamida 2 belgi bo'lishi kerak");
  }
  const ageNum = Number(age);
  if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
    return errorResp(res, "Yosh 10 dan 100 gacha bo'lishi kerak");
  }
  const genderMap: Record<string, string> = {
    Erkak: "male",
    Ayol: "female",
    male: "male",
    female: "female",
    other: "other",
  };
  const dbGender = genderMap[gender];
  if (!dbGender) {
    return errorResp(res, "Jins faqat 'Erkak' yoki 'Ayol' bo'lishi kerak");
  }

  const [user] = await db
    .update(usersTable)
    .set({
      name: name.trim(),
      age: ageNum,
      gender: dbGender as any,
      profileCompleted: true,
    })
    .where(eq(usersTable.id, req.userId!))
    .returning();

  if (!user) {
    return errorResp(res, "Foydalanuvchi topilmadi", 404);
  }

  return successResp(res, { user: formatUser(user) });
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return errorResp(res, "refreshToken talab qilinadi", 401);
  }

  let payload: any;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return errorResp(res, "Token yaroqsiz yoki muddati o'tgan", 401);
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, payload.userId))
    .limit(1);

  if (!user) {
    return errorResp(res, "Foydalanuvchi topilmadi", 401);
  }

  const accessToken = signAccessToken({ userId: user.id, phone: user.phone });

  return successResp(res, {
    accessToken,
    user: formatUser(user),
  });
});

router.post("/admin-login", async (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] || "fitboom_admin_2024";

  if (password !== ADMIN_PASSWORD) {
    return errorResp(res, "Noto'g'ri parol", 401);
  }

  let [admin] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.phone, "admin"))
    .limit(1);

  if (!admin) {
    const [newAdmin] = await db
      .insert(usersTable)
      .values({ phone: "admin", name: "Admin", isAdmin: true, profileCompleted: true, credits: 0 })
      .returning();
    admin = newAdmin;
  }

  const tokens = signTokenPair({ userId: admin.id, phone: admin.phone });

  return successResp(res, {
    ...tokens,
    token: tokens.accessToken,
    user: formatUser(admin),
  });
});

router.post("/logout", authenticate as any, (_req, res) => {
  return successResp(res, { message: "Muvaffaqiyatli chiqildi" });
});

export default router;
