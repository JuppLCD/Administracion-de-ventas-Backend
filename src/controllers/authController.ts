import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { generateCode } from '../utils/jwtCode';
import { sendCode } from '../utils/mailer';

import { users } from '../data/user';

export class AuthController {
	static generateCode = async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;

		try {
			// Busqueda en DB
			const user = users.find((user) => user.email === email);

			if (!user) {
				throw boom.notFound('Usuario no existente en la base de datos');
			}
			// Generacion de codigo
			const { code, ...payloadJWTCode } = user;
			const newCode = await generateCode(payloadJWTCode);
			await sendCode({ code: newCode, email: user.email });

			res.json({
				message: 'El codigo fue generado y enviado con exito',
				newCode,
			});
		} catch (err) {
			next(err);
		}
	};

	static login = (req: Request, res: Response, next: NextFunction) => {
		const { email, code } = req.body;

		try {
			if (!email || !code) {
				throw boom.badData('Faltan datos en el body, ya sea el email o el codigo de acceso');
			}

			// Busqueda en DB
			const user = users.find((user) => user.email === email);

			if (!user) {
				throw boom.notFound('Usuario no existente en la base de datos');
			}

			if (user.code !== code) {
				throw boom.unauthorized('El codigo no es valido');
			}

			res.json({
				message: 'INICIASTE SESION ' + code,
			});
		} catch (err) {
			next(err);
		}
	};
}
