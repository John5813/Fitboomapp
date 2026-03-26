import { Router } from "express";
import { db } from "@workspace/db";
import { topupOrdersTable } from "@workspace/db/schema";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

const CREDIT_PACKAGES = [
  { credits: 6, priceUzs: 120000, label: "Boshlang'ich" },
  { credits: 13, priceUzs: 250000, label: "Mashhur", popular: true },
  { credits: 24, priceUzs: 450000, label: "Premium" },
];

const PAYMENT_CARD = process.env["PAYMENT_CARD"] || "9860 1234 5678 9012";

router.get("/config", (_req, res) => {
  res.json({
    cardNumber: PAYMENT_CARD,
    packages: CREDIT_PACKAGES,
  });
});

router.get("/packages", (_req, res) => {
  res.json({ packages: CREDIT_PACKAGES });
});

router.post("/upload-receipt", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { amountCredits, amountUzs, receiptUrl } = req.body;

  if (!amountCredits || !amountUzs) {
    return res.status(400).json({ message: "Kredit miqdori va narx talab qilinadi" });
  }

  const [order] = await db
    .insert(topupOrdersTable)
    .values({
      userId: req.userId!,
      amountCredits: Number(amountCredits),
      amountUzs: Number(amountUzs),
      receiptUrl: receiptUrl || null,
      status: "pending",
    })
    .returning();

  res.status(201).json({
    message: "To'lov cheki yuborildi. Admin tekshirganidan so'ng kreditlar qo'shiladi.",
    orderId: String(order.id),
  });
});

export default router;
