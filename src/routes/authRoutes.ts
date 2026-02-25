import { Router } from "express";
import { login, signup } from "../auth/auth.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/me',authenticate, (req,res)=>{
    res.json(req.user)
})
export default router;