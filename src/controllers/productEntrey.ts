import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { ProductEntryServices } from '../services/productEntry';

export class ProductEntryController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const productEntries = await ProductEntryServices.getAll();

			res.json({
				productEntries,
			});
		} catch (err) {
			next(err);
		}
	};

	static getById = async (req: Request, res: Response, next: NextFunction) => {
		const { productEntryId } = req.params;

		try {
			if (isNaN(Number(productEntryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productEntryId)');
			}

			const productEntry = await ProductEntryServices.getById(Number(productEntryId));

			res.json({
				productEntry,
			});
		} catch (err) {
			next(err);
		}
	};

	static store = async (req: Request, res: Response, next: NextFunction) => {
		const newProductEntry = req.body;

		try {
			const productEntry = await ProductEntryServices.store(newProductEntry);

			res.json({
				productEntry,
			});
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const { productEntryId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			if (isNaN(Number(productEntryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productEntryId)');
			}
			const productEntry = await ProductEntryServices.update(Number(productEntryId), fieldsToUpdate);

			res.json({
				productEntry,
			});
		} catch (err) {
			next(err);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const { productEntryId } = req.params;

		try {
			if (isNaN(Number(productEntryId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:productEntryId)');
			}
			await ProductEntryServices.destroy(Number(productEntryId));

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};
}
