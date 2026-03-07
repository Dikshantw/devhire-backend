import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { apply, getApplications, updateStatus } from "../api/applicationApi.js";

const router = Router();

router.post('/apply/:jobId',authenticate,authorize("SEEKER"),apply)
router.get('/job/:jobId',authenticate,authorize("RECRUITER"),getApplications)
router.patch('/:applicationId/status',authenticate,authorize("RECRUITER"),updateStatus)
export default router;