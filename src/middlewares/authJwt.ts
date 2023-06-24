import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwtToken';

export default async function authJwt(req: Request, res: Response, next: NextFunction) {
	const token: string | undefined = req.headers['authorization'] || req.body.token;
	if (!token) {
		next(boom.unauthorized('Authorization required'));
	}

	try {
		const info = await verifyToken(token as string);

		req.body.infoToken = info;
		req.body.code = token;
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
