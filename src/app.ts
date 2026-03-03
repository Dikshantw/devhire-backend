import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/company',companyRoutes);
export default app;