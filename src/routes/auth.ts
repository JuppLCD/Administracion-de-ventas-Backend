import { Router } from 'express';

import { AuthController } from '../controllers/authController';

const router = Router();

router.post('/code', AuthController.generateCode);
router.post('/login', AuthController.login);

export { router };
