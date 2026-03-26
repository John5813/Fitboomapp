import { Router } from "express";
import { db } from "@workspace/db";
import { gymsTable, gymSlotsTable, bookingsTable } from "@workspace/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

function formatGym(gym: typeof gymsTable.$inferSelect) {
  return {
    id: String(gym.id),
    name: gym.name,
    description: gym.description,
    address: gym.address,
    latitude: gym.latitude,
    longitude: gym.longitude,
    imageUrl: gym.imageUrl,
    imageUrls: (gym.imageUrls as string[]) || [],
    credits: gym.credits,
    categories: (gym.categories as string[]) || [],
    amenities: (gym.amenities as string[]) || [],
    operatingHours: gym.operatingHours,
    rating: gym.rating,
    reviewCount: gym.reviewCount,
    isActive: gym.isActive,
  };
}

function ok(res: any, data: any) {
  return res.json({ success: true, data });
}

function fail(res: any, msg: string, status = 400) {
  return res.status(status).json({ success: false, error: msg });
}

router.get("/", async (_req, res) => {
  const gyms = await db
    .select()
    .from(gymsTable)
    .where(eq(gymsTable.isActive, true))
    .orderBy(gymsTable.id);

  return ok(res, { gyms: gyms.map(formatGym) });
});

router.get("/:id", async (req, res) => {
  const gymId = parseInt(req.params.id);
  if (isNaN(gymId)) return fail(res, "Noto'g'ri ID");

  const [gym] = await db.select().from(gymsTable).where(eq(gymsTable.id, gymId)).limit(1);
  if (!gym) return fail(res, "Zal topilmadi", 404);

  return ok(res, { gym: formatGym(gym) });
});

router.get("/:id/slots", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const gymId = parseInt(req.params.id);
  if (isNaN(gymId)) return fail(res, "Noto'g'ri ID");

  const { date } = req.query;

  const today = new Date();
  const slots = [];

  const daysToGenerate = 7;
  for (let i = 0; i < daysToGenerate; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];

    if (date && dateStr !== date) continue;

    const daySlots = [
      { start: "06:00", end: "08:00" },
      { start: "08:00", end: "10:00" },
      { start: "10:00", end: "12:00" },
      { start: "12:00", end: "14:00" },
      { start: "14:00", end: "16:00" },
      { start: "16:00", end: "18:00" },
      { start: "18:00", end: "20:00" },
      { start: "20:00", end: "22:00" },
    ];

    for (const slot of daySlots) {
      const bookedCount = await db
        .select({ count: sql<number>`count(*)` })
        .from(bookingsTable)
        .where(
          and(
            eq(bookingsTable.gymId, gymId),
            eq(bookingsTable.scheduledDate, dateStr),
            eq(bookingsTable.startTime, slot.start),
            eq(bookingsTable.status, "confirmed")
          )
        );

      const count = Number(bookedCount[0]?.count ?? 0);
      const capacity = 20;

      slots.push({
        id: `${gymId}-${dateStr}-${slot.start}`,
        gymId: String(gymId),
        date: dateStr,
        startTime: slot.start,
        endTime: slot.end,
        capacity,
        bookedCount: count,
        isAvailable: count < capacity,
      });
    }
  }

  return ok(res, { slots });
});

export default router;
