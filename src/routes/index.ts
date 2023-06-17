import { Router } from 'express';
import { readdirSync } from 'fs';

const router = Router();

function clearFileName(file: string) {
	return file.split('.')[0];
}

//* The name of the file will be the name of the endpoint of said router
readdirSync(__dirname).forEach(async (file) => {
	const fileName = clearFileName(file);

	if (fileName !== 'index') {
		const moduleRouter = await import(`./${fileName}`);

		if (Object.getPrototypeOf(moduleRouter?.router) === Router) {
			router.use(`/${fileName}`, moduleRouter.router);
		}
	}
});

export { router };
