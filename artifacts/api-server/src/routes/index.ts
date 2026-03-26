import { Router, type IRouter } from "express";
import healthRouter from "./health";
import mobileV1Router from "./mobile/v1/index";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/mobile/v1", mobileV1Router);

export default router;
