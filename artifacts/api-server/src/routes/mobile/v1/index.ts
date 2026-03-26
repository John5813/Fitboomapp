import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import gymsRouter from "./gyms";
import bookingsRouter from "./bookings";
import creditsRouter from "./credits";
import paymentsRouter from "./payments";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/gyms", gymsRouter);
router.use("/bookings", bookingsRouter);
router.use("/credits", creditsRouter);
router.use("/payments", paymentsRouter);

export default router;
