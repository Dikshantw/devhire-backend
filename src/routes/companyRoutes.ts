import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createCompany } from "../api/companyApi.js";

const router = Router();

router.post('/', authenticate,authorize("RECRUITER"),createCompany)
export default router;