import { Response, Request } from 'express';

export const notFound = (req: Request, res: Response) => {
	res.status(404).json({
		error: 'Not Found',
		message: 'The path could not be found on the server.',
		statusCode: 404,
	});
};
