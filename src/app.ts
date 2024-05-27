import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import apiRoutes from './routes/api.routes';
import { authenticateJWT } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // Middleware to parse JSON requests
app.use('/auth', authRoutes); // Routes for authentication
app.use('/api', authenticateJWT, apiRoutes); // Protected API routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
