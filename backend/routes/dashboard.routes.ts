import { Router } from "express";
import { getCandidateDashboard } from "../controllers/dashboard.controller";

const router = Router();

router.get("/candidate", getCandidateDashboard);

export default router;