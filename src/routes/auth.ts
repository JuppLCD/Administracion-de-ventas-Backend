import { Router } from 'express';

import { AuthController } from '../controllers/auth';

import authJwt from '../middlewares/authJwt';

const router = Router();

router.get('/validate_token', authJwt, AuthController.validateToken);
router.post('/code', AuthController.generateCode);
router.post('/login', AuthController.login);

export { router };
