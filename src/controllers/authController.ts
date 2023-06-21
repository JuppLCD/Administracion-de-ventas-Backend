import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { generateCode } from '../utils/jwtCode';
import { sendCode } from '../utils/mailer';

import { UserModel } from '../db';

export class AuthController {
	static generateCode = async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;

		try {
			// Busqueda en DB
			const user = await UserModel.findOne({ where: { email } });

			if (!user) {
				throw boom.notFound('Usuario no existente en la base de datos');
			}

			// Generar codigo y enviar
			const { code, ...payloadJWTCode } = user.dataValues;
			const newCode = await generateCode(payloadJWTCode);
			sendCode({ code: newCode, email });

			await user.update({ code: newCode });

			// TODO: Tengo que enviar el codigo como una cokie
			res.json({
				message: 'El codigo fue generado y enviado con exito',
				newCode,
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

			// Busqueda en DB
			const user = await UserModel.findOne({ where: { email } });

			if (!user) {
				throw boom.notFound('Usuario no existente en la base de datos');
			}

			if (user.dataValues.code !== code) {
				throw boom.unauthorized('El codigo no coincide');
			}

			// TODO: Tengo que enviar el codigo como una cokie
			res.json({
				message: 'INICIASTE SESION ' + code,
			});
		} catch (err) {
			next(err);
		}
	};
}
