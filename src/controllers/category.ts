import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { CategoryServices } from '../services/category';

export class CategoryController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const categories = await CategoryServices.getAll();

			res.json({
				categories,
			});
		} catch (err) {
			next(err);
		}
	};

	static getById = async (req: Request, res: Response, next: NextFunction) => {
		const { categoryId } = req.params;

		try {
			if (isNaN(Number(categoryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:categoryId)');
			}

			const category = await CategoryServices.getById(Number(categoryId));

			res.json({
				category,
			});
		} catch (err) {
			next(err);
		}
	};

	static store = async (req: Request, res: Response, next: NextFunction) => {
		const newCategory = req.body;

		try {
			const category = await CategoryServices.store(newCategory);

			res.json({
				category,
			});
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const { categoryId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			if (isNaN(Number(categoryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:categoryId)');
			}
			const category = await CategoryServices.update(Number(categoryId), fieldsToUpdate);

			res.json({
				category,
			});
		} catch (err) {
			next(err);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const { categoryId } = req.params;

		try {
			if (isNaN(Number(categoryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:categoryId)');
			}
			await CategoryServices.destroy(Number(categoryId));

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};
}
