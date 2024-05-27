import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register); // Route for user registration
router.post('/login', login); // Route for user login

export default router;
