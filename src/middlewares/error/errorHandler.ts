import boom, { isBoom } from '@hapi/boom';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	let payload = boom.serverUnavailable('An internal server error occurred').output.payload;

	if (isBoom(err)) {
		payload = { ...err.output.payload };
	} else if (err.message && err.statusCode && err.error) {
		payload = {
			statusCode: err.statusCode,
			error: err.error,
			message: err.message,
		};
	}

	res.status(payload.statusCode).json(payload);
};
