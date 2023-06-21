import jwt from 'jsonwebtoken';

import type { IPayloadJWTCode } from '../types/user.interface';

if (!process.env.JWT_SECRET_KEY) {
	throw new Error('The variable "JWT_SECRET_KEY" cannot be found among the environment variables');
}

export async function generateCode(payload: IPayloadJWTCode) {
	// Expires in 1 hour
	const expiresIn = 60 * 60;
	return await jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
		expiresIn,
	});
}

export async function verifyCode(token: string) {
	return await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
}
