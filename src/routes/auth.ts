import { Router } from 'express';

import { AuthController } from '../controllers/authController';

import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/code', AuthController.generateCode);
router.post('/login', authJwt, AuthController.login);

export { router };
