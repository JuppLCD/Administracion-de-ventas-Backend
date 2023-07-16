import boom from '@hapi/boom';

import { UserModel } from '../db';

import { UserCode } from '../utils/userCode';
import { sendCode } from '../utils/mailer';
import { generateToken } from '../utils/jwtToken';

import type { IUserModel } from '../types/models/user.interface';

export class AuthServices {
	static generateCode = async (email: string) => {
		const user = await this.getUser(email);

		// Generar codigo y enviar
		const { newCode, new_expire_code } = UserCode.generateCode();
		sendCode({ code: newCode, email });

		await this.updateCode(user, newCode, new_expire_code);

		return newCode;
	};

	static login = async (email: string, code: string) => {
		const user = await this.getUser(email);

		if (user.dataValues.code !== code) {
			throw boom.unauthorized('El codigo no coincide');
		}

		if (UserCode.isExpires(user.dataValues.expire_code)) {
			throw boom.unauthorized('El codigo ya expiro');
		}

		const { code: userCode, ...payloadJWT } = user.dataValues;
		const token = await generateToken(payloadJWT);

		return token;
	};

	static getUser = async (email: string) => {
		const user = await UserModel.findOne({ where: { email } });

		if (!user) {
			throw boom.notFound('Usuario no existente en la base de datos');
		}

		return user;
	};

	static updateCode = async (user: IUserModel, code: string, expire_code: string) => {
		await user.update({ code, expire_code });
	};
}
