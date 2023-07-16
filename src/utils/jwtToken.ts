import jwt from 'jsonwebtoken';

import { ENV } from '../config';

import type { IPayloadJWT } from '../types/models/user.interface';

export async function generateToken(payload: IPayloadJWT) {
	// Expires in 2 days
	const expiresIn = 60 * 60 * 20 * 2;
	return await jwt.sign(payload, ENV.JWT_SECRET_KEY, {
		expiresIn,
	});
}

export async function verifyToken(token: string) {
	return await jwt.verify(token, ENV.JWT_SECRET_KEY);
}
