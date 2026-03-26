import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable, gymsTable, usersTable, creditTransactionsTable } from "@workspace/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

async function formatBooking(booking: typeof bookingsTable.$inferSelect) {
  const [gym] = await db.select().from(gymsTable).where(eq(gymsTable.id, booking.gymId)).limit(1);
  return {
    id: String(booking.id),
    gymId: String(booking.gymId),
    gymName: gym?.name || "Zal",
    gymAddress: gym?.address || "",
    gymImageUrl: gym?.imageUrl || null,
    status: booking.status,
    scheduledDate: booking.scheduledDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
    qrCode: booking.qrCode,
    creditsUsed: booking.creditsUsed,
    createdAt: booking.createdAt,
  };
}

router.get("/", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const bookings = await db
    .select()
    .from(bookingsTable)
    .where(eq(bookingsTable.userId, req.userId!))
    .orderBy(desc(bookingsTable.createdAt));

  const formatted = await Promise.all(bookings.map(formatBooking));
  res.json({ bookings: formatted });
});

router.post("/", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { gymId, scheduledDate, startTime, endTime, timeSlotId } = req.body;

  if (!gymId || !scheduledDate) {
    return res.status(400).json({ message: "Zal va sana talab qilinadi" });
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });

  const [gym] = await db.select().from(gymsTable).where(eq(gymsTable.id, parseInt(gymId))).limit(1);
  if (!gym) return res.status(404).json({ message: "Zal topilmadi" });

  const creditsNeeded = gym.credits || 1;
  if (user.credits < creditsNeeded) {
    return res.status(400).json({ message: "Kredit yetarli emas" });
  }

  const qrCode = uuidv4();

  const [booking] = await db
    .insert(bookingsTable)
    .values({
      userId: req.userId!,
      gymId: parseInt(gymId),
      status: "confirmed",
      scheduledDate,
      startTime: startTime || null,
      endTime: endTime || null,
      qrCode,
      creditsUsed: creditsNeeded,
    })
    .returning();

  await db
    .update(usersTable)
    .set({ credits: user.credits - creditsNeeded })
    .where(eq(usersTable.id, req.userId!));

  await db.insert(creditTransactionsTable).values({
    userId: req.userId!,
    amount: -creditsNeeded,
    type: "spent",
    description: `${gym.name} - bron`,
    relatedBookingId: booking.id,
  });

  const formatted = await formatBooking(booking);
  res.status(201).json({ booking: formatted });
});

router.delete("/:id", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) return res.status(400).json({ message: "Noto'g'ri ID" });

  const [booking] = await db
    .select()
    .from(bookingsTable)
    .where(and(eq(bookingsTable.id, bookingId), eq(bookingsTable.userId, req.userId!)))
    .limit(1);

  if (!booking) return res.status(404).json({ message: "Bron topilmadi" });
  if (booking.status === "cancelled") return res.status(400).json({ message: "Bron allaqachon bekor qilingan" });

  await db
    .update(bookingsTable)
    .set({ status: "cancelled" })
    .where(eq(bookingsTable.id, bookingId));

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (user) {
    await db
      .update(usersTable)
      .set({ credits: user.credits + booking.creditsUsed })
      .where(eq(usersTable.id, req.userId!));

    await db.insert(creditTransactionsTable).values({
      userId: req.userId!,
      amount: booking.creditsUsed,
      type: "refunded",
      description: "Bron bekor qilindi - kredit qaytarildi",
      relatedBookingId: booking.id,
    });
  }

  res.json({ message: "Bron bekor qilindi" });
});

export default router;
