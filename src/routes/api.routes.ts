import { Router } from 'express';
import { processRequest } from '../controllers/api.controller';

const router = Router();

router.post('/process', processRequest); // Route for processing requests

export default router;
