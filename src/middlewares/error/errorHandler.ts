import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.log('ERROR HANDLER');

	let payload = {
		statusCode: 500,
		error: 'Internal Server Error',
		message: 'An internal server error occurred',
	};

	if (err.message && err.statusCode && err.error) {
		payload = {
			statusCode: err.statusCode,
			error: err.error,
			message: err.message,
		};
	}

	res.status(payload.statusCode).json(payload);
};
