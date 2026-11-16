import { Router } from "express";

import { getOverviewList } from "../controllers/dashboardController";

const router = Router();

router.get("/overview", getOverviewList);

export default router;