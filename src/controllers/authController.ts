import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { UserModel } from '../db';

import { UserCode } from '../utils/userCode';
import { sendCode } from '../utils/mailer';
import { generateToken } from '../utils/jwtToken';

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
			const { newCode, new_expire_code } = UserCode.generateCode();
			sendCode({ code: newCode, email });

			await user.update({ code: newCode, expire_code: new_expire_code });

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

			if (UserCode.isExpires(user.dataValues.expire_code)) {
				throw boom.unauthorized('El codigo ya expiro');
			}

			const { code: userCode, ...payloadJWT } = user.dataValues;
			const token = await generateToken(payloadJWT);

			// TODO: Tengo que enviar el codigo como una cokie
			res.json({
				message: 'INICIASTE SESION ' + code,
				token: token,
			});
		} catch (err) {
			next(err);
		}
	};
}
