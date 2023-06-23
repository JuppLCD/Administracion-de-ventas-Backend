import jwt from 'jsonwebtoken';

import { ENV } from '../config';

import type { IPayloadJWTCode } from '../types/user.interface';

export async function generateCode(payload: IPayloadJWTCode) {
	// Expires in 1 hour
	const expiresIn = 60 * 60;
	return await jwt.sign(payload, ENV.JWT_SECRET_KEY, {
		expiresIn,
	});
}

export async function verifyCode(token: string) {
	return await jwt.verify(token, ENV.JWT_SECRET_KEY);
}
