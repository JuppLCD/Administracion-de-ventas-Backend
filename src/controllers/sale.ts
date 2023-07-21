import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { SaleServices } from '../services/sale';

export class SaleController {
	static getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const sales = await SaleServices.getAll();

			res.json({
				sales,
			});
		} catch (err) {
			next(err);
		}
	};

	static getById = async (req: Request, res: Response, next: NextFunction) => {
		const { saleId } = req.params;

		try {
			if (isNaN(Number(saleId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:saleId)');
			}

			const sale = await SaleServices.getById(Number(saleId));

			res.json({
				sale,
			});
		} catch (err) {
			next(err);
		}
	};

	static store = async (req: Request, res: Response, next: NextFunction) => {
		const newSale = req.body;

		try {
			const sale = await SaleServices.store(newSale);

			res.json({
				sale,
			});
		} catch (err) {
			next(err);
		}
	};

	static update = async (req: Request, res: Response, next: NextFunction) => {
		const { saleId } = req.params;
		const fieldsToUpdate = req.body;

		try {
			if (isNaN(Number(saleId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:saleId)');
			}
			const sale = await SaleServices.update(Number(saleId), fieldsToUpdate);

			res.json({
				sale,
			});
		} catch (err) {
			next(err);
		}
	};

	static delete = async (req: Request, res: Response, next: NextFunction) => {
		const { saleId } = req.params;

		try {
			if (isNaN(Number(saleId))) {
				throw boom.badRequest('Se esperaba que el parametro fuese un numero (/:saleId)');
			}
			await SaleServices.destroy(Number(saleId));

			res.status(200).send();
		} catch (err) {
			next(err);
		}
	};
}
