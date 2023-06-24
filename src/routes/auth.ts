import { Router } from 'express';

import { AuthController } from '../controllers/authController';

const router = Router();

router.get('/code', AuthController.generateCode);
router.post('/login', AuthController.login);

export { router };
