import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

function formatUser(user: typeof usersTable.$inferSelect) {
  return {
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
    createdAt: user.createdAt,
  };
}

router.get("/me", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.userId!)).limit(1);
  if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
  res.json({ user: formatUser(user) });
});

router.put("/me", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { name, age, gender, profileImageUrl } = req.body;
  const updates: Partial<typeof usersTable.$inferInsert> = {};

  if (name !== undefined) updates.name = name;
  if (age !== undefined) updates.age = Number(age);
  if (gender !== undefined) updates.gender = gender;
  if (profileImageUrl !== undefined) updates.profileImageUrl = profileImageUrl;

  const hasProfileFields = updates.name && updates.age && updates.gender;
  if (hasProfileFields) updates.profileCompleted = true;

  const [user] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json({ user: formatUser(user) });
});

router.patch("/profile", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { name, age, gender } = req.body;
  const updates: Partial<typeof usersTable.$inferInsert> = {};

  if (name) updates.name = name;
  if (age) updates.age = Number(age);
  if (gender) updates.gender = gender;
  if (name && age && gender) updates.profileCompleted = true;

  const [user] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json({ user: formatUser(user) });
});

export default router;
