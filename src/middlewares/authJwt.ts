import { NextFunction, Response } from 'express';
import boom from '@hapi/boom';

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwtToken';

import type { AuthRequest } from '../types/request/authRequest.interface';
import type { IPayloadJWT } from '../types/jwt.interface';

export default async function authJwt(req: AuthRequest, res: Response, next: NextFunction) {
	const token: string | undefined = req.headers['authorization'];
	if (!token) {
		next(boom.unauthorized('Authorization required'));
	}

	try {
		const userInfo = await verifyToken(token as string);

		req.user = userInfo as IPayloadJWT;
		next();
	} catch (err) {
		if (err instanceof TokenExpiredError) {
			next(boom.unauthorized('The token expired'));
		} else if (err instanceof JsonWebTokenError) {
			next(boom.unauthorized('Token verification failed'));
		}
		next(err);
	}
}
