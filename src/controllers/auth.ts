import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { AuthServices } from '../services/auth';
import { generateToken } from '../utils/jwtToken';

import type { AuthRequest } from '../types/request/authRequest.interface';

export class AuthController {
	static generateCode = async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;

		try {
			const code = await AuthServices.generateCode(email);

			res.json({
				message: 'El codigo fue generado y enviado con exito',
				code,
			});
		} catch (err) {
			next(err);
		}
	};

	static login = async (req: Request, res: Response, next: NextFunction) => {
		const { email, code } = req.body;

		try {
			if (!email || !code) {
				throw boom.badData('Faltan datos en el body, ya sea el email o el codigo de acceso');
			}

			const token = await AuthServices.login(email, code);

			// TODO: Tengo que enviar el codigo como una cokie
			res.json({
				message: 'INICIASTE SESION ' + code,
				token: token,
			});
		} catch (err) {
			next(err);
		}
	};

	static validateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			const newToken = await AuthServices.validateToken(req.user);

			// TODO: Tengo que enviar el codigo como una cokie
			res.json({
				message: 'Token validado y extendido',
				token: newToken,
			});
		} catch (err) {
			next(err);
		}
	};
}
