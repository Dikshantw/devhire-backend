import Router from 'express';
import { createJob, getJobs } from '../api/jobs/jobApi.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/',getJobs);
router.post('/',authenticate,authorize("RECRUITER"),createJob);

export default router;