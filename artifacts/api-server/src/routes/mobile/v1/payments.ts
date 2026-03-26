import { Router } from "express";
import { db } from "@workspace/db";
import { topupOrdersTable } from "@workspace/db/schema";
import { authenticate, type AuthenticatedRequest } from "../../../middleware/authenticate";

const router = Router();

function ok(res: any, data: any, status = 200) {
  return res.status(status).json({ success: true, data });
}

function fail(res: any, error: string, status = 400) {
  return res.status(status).json({ success: false, error });
}

const CREDIT_PACKAGES = [
  { credits: 6, priceUzs: 120000, label: "Boshlang'ich" },
  { credits: 13, priceUzs: 250000, label: "Mashhur", popular: true },
  { credits: 24, priceUzs: 450000, label: "Premium" },
];

const PAYMENT_CARD = process.env["PAYMENT_CARD"] || "9860 1234 5678 9012";

router.get("/config", (_req, res) => {
  return ok(res, {
    cardNumber: PAYMENT_CARD,
    packages: CREDIT_PACKAGES,
  });
});

router.get("/packages", (_req, res) => {
  return ok(res, { packages: CREDIT_PACKAGES });
});

router.post("/upload-receipt", authenticate as any, async (req: AuthenticatedRequest, res) => {
  const { amountCredits, amountUzs, receiptUrl } = req.body;

  if (!amountCredits || !amountUzs) {
    return fail(res, "Kredit miqdori va narx talab qilinadi");
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

  return ok(res, {
    message: "To'lov cheki yuborildi. Admin tekshirganidan so'ng kreditlar qo'shiladi.",
    orderId: String(order.id),
  }, 201);
});

export default router;
