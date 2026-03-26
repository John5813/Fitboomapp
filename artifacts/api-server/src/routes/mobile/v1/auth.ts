import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable, otpCodesTable } from "@workspace/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { signToken, generateOtp } from "../../../lib/auth";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

router.post("/sms/send", async (req, res) => {
  const { phone } = req.body;
  if (!phone || phone.length < 7) {
    return res.status(400).json({ message: "Telefon raqam noto'g'ri" });
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await db.insert(otpCodesTable).values({ phone, code, expiresAt });

  console.log(`[OTP] Phone: ${phone} Code: ${code}`);

  res.json({ message: "Kod yuborildi", expiresIn: 300 });
});

router.post("/sms/verify", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ message: "Telefon va kod talab qilinadi" });
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
    return res.status(400).json({ message: "Kod noto'g'ri yoki muddati o'tgan" });
  }

  await db.update(otpCodesTable).set({ used: true }).where(eq(otpCodesTable.id, otp.id));

  let [user] = await db.select().from(usersTable).where(eq(usersTable.phone, phone)).limit(1);

  if (!user) {
    const [newUser] = await db
      .insert(usersTable)
      .values({ phone, credits: 0 })
      .returning();
    user = newUser;
  }

  const token = signToken({ userId: user.id, phone: user.phone });

  res.json({
    token,
    user: {
      id: String(user.id),
      phone: user.phone,
      name: user.name,
      age: user.age,
      gender: user.gender,
      profileImageUrl: user.profileImageUrl,
      credits: user.credits,
      creditExpiryDate: user.creditExpiryDate,
      isAdmin: user.isAdmin,
      profileCompleted: user.profileCompleted,
    },
  });
});

router.post("/login", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ message: "Telefon va kod talab qilinadi" });
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
    return res.status(400).json({ message: "Kod noto'g'ri yoki muddati o'tgan" });
  }

  await db.update(otpCodesTable).set({ used: true }).where(eq(otpCodesTable.id, otp.id));

  let [user] = await db.select().from(usersTable).where(eq(usersTable.phone, phone)).limit(1);
  if (!user) {
    const [newUser] = await db.insert(usersTable).values({ phone, credits: 0 }).returning();
    user = newUser;
  }

  const token = signToken({ userId: user.id, phone: user.phone });
  res.json({
    token,
    user: {
      id: String(user.id),
      phone: user.phone,
      name: user.name,
      age: user.age,
      gender: user.gender,
      profileImageUrl: user.profileImageUrl,
      credits: user.credits,
      creditExpiryDate: user.creditExpiryDate,
      isAdmin: user.isAdmin,
      profileCompleted: user.profileCompleted,
    },
  });
});

router.post("/logout", authenticate as any, (_req, res) => {
  res.json({ message: "Muvaffaqiyatli chiqildi" });
});

export default router;
