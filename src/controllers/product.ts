import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { ProductServices } from '../services/product';

export class ProductController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const products = await ProductServices.getAll();

			res.json({
				products,
			});
		} catch (err) {
			next(err);
		}
	};

	static getById = async (req: Request, res: Response, next: NextFunction) => {
		const { productId } = req.params;

		try {
			if (isNaN(Number(productId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productId)');
			}

			const product = await ProductServices.getById(Number(productId));

			res.json({
				product,
			});
		} catch (err) {
			next(err);
		}
	};

	static getAllByCategory = async (req: Request, res: Response, next: NextFunction) => {
		const { categoryId } = req.params;

		try {
			if (isNaN(Number(categoryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:categoryId)');
			}

			const products = await ProductServices.getAllByCategory(Number(categoryId));

			res.json({
				products,
			});
		} catch (err) {
			next(err);
		}
	};

	static search = async (req: Request, res: Response, next: NextFunction) => {
		const searchByField = req.body;

		try {
			const products = await ProductServices.searchAllByField(searchByField);

			res.json({
				products,
			});
		} catch (err) {
			next(err);
		}
	};

	static store = async (req: Request, res: Response, next: NextFunction) => {
		const newProduct = req.body;

		try {
			const product = await ProductServices.store(newProduct);

			res.json({
				product,
			});
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const { productId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			if (isNaN(Number(productId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productId)');
			}
			const product = await ProductServices.update(Number(productId), fieldsToUpdate);

			res.json({
				product,
			});
		} catch (err) {
			next(err);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const { productId } = req.params;

		try {
			if (isNaN(Number(productId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productId)');
			}
			await ProductServices.destroy(Number(productId));

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};
}
