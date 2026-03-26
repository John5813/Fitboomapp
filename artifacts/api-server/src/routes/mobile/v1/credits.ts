import { Router } from "express";
import { db } from "@workspace/db";
import { creditTransactionsTable, topupOrdersTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

router.get("/history", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const history = await db
    .select()
    .from(creditTransactionsTable)
    .where(eq(creditTransactionsTable.userId, req.userId!))
    .orderBy(desc(creditTransactionsTable.createdAt))
    .limit(50);

  const formatted = history.map((h) => ({
    id: String(h.id),
    amount: h.amount,
    type: h.type,
    description: h.description,
    createdAt: h.createdAt,
  }));

  res.json({ creditHistory: formatted });
});

router.get("/topups", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const topups = await db
    .select()
    .from(topupOrdersTable)
    .where(eq(topupOrdersTable.userId, req.userId!))
    .orderBy(desc(topupOrdersTable.createdAt))
    .limit(20);

  const formatted = topups.map((t) => ({
    id: String(t.id),
    amountCredits: t.amountCredits,
    amountUzs: t.amountUzs,
    receiptUrl: t.receiptUrl,
    status: t.status,
    adminNote: t.adminNote,
    createdAt: t.createdAt,
  }));

  res.json({ topupHistory: formatted });
});

export default router;
