import { ErrorRequestHandler } from 'express';

export const clientErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (req.xhr) {
		res.status(501).send({
			error: 'Not Implemented',
			message: 'The server does not support the facility required.',
			statusCode: 501,
		});
	} else {
		next(err);
	}
};
