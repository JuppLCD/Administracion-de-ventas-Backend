import { ErrorRequestHandler } from 'express';

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
	console.log('################## Error ##################');
	console.log(`Error path --> ${req.originalUrl}`);
	console.log(JSON.stringify(err));
	// console.error(err.stack);
	console.log('###########################################');
	next(err);
};
