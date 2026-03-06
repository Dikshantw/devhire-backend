import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { apply } from "../api/applicationApi.js";

const router = Router();

router.post('/apply/:jobId',authenticate,authorize("SEEKER"),apply)

export default router;