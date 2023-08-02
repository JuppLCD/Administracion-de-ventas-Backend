import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { SaleModel, SaleDetailModel, ProductModel } from '../db';

import { addZero } from '../utils/addZero';

import type { ISaleModel } from '../types/models/sale.interface';
import type { IProductModel } from '../types/models/product.interface';
import type { ISaleDetailModel } from '../types/models/sale_detail.interface';
import type { ISaleData, ISaleFields } from '../types/services/sale.interface';
import type { IProductData } from '../types/services/product.interface';

export class SaleServices {
	static getAll = async () => {
		const sales = await SaleModel.findAll();
		return sales.map((s) => s.toJSON());
	};

	static getById = async (saleId: number, returnModel = false) => {
		const sale = await SaleModel.findOne({
			where: {
				id: saleId,
			},
			include: { model: SaleDetailModel, as: 'details', attributes: ['id', 'stock', 'price', 'product_id'] },
		});

		if (!sale) {
			throw boom.notFound('La venta no existente en la base de datos');
		}

		return returnModel ? sale : sale.toJSON();
	};

	static store = async (data: ISaleData) => {
		return await sequelize.transaction(async (t) => {
			const { total, tax } = this.getTotalAndTaxs(data);

			if (data.voucher_number === undefined) {
				data.voucher_number = await this.generateVoucherNumber();
			}

			const newSale = await SaleModel.create({
				user_id: data.user_id,
				client_id: data.client_id,

				voucher_number: data.voucher_number,
				voucher_series: data.voucher_series,
				voucher_type: data.voucher_type,

				total,
				tax,
			});

			// Registration of the details of the sale of products and their decrease
			this.recordDetailsAndDecrement(data, newSale.dataValues.id);

			return newSale.toJSON();
		});
	};

	static getTotalAndTaxs(data: ISaleData) {
		let total = data.products.reduce((prev, curr) => {
			return prev + curr.price * curr.stock;
		}, 0);

		const IVA_PRODUCTS = total * 0.21;
		const OTHER_TAXES = (total - IVA_PRODUCTS) * 0.1;

		total += OTHER_TAXES;

		const tax = IVA_PRODUCTS + OTHER_TAXES; // import taxes, etc.

		return { total, tax };
	}

	static generateVoucherNumber = async () => {
		let n = 0;
		const lastSale = await SaleModel.findOne({
			order: [['id', 'DESC']],
		});

		if (lastSale !== null) {
			n = lastSale.dataValues.id;
		}

		return addZero(n, 10 - `${n}`.length);
	};

	static recordDetailsAndDecrement = async (data: ISaleData, saleId: number) => {
		// Get products sold
		const productsToFind = data.products.map((product) =>
			ProductModel.findOne({
				where: {
					id: product.id,
					// code: product.code // ! Quitar luego, es para no tener que estar buscando el codigo de un producto en la DB
				},
			})
		);
		const products = await Promise.all(productsToFind);

		const productsToDecremet: Promise<IProductModel>[] = [];
		const saleRecord: Promise<ISaleDetailModel>[] = [];
		for (const productInDB of products) {
			if (productInDB === null) {
				throw boom.notFound(`El producto no exite en la DB`);
			}
			const productData = data.products.find((p) => p.id === productInDB.dataValues.id) as IProductData;

			saleRecord.push(
				SaleDetailModel.create({
					sale_id: saleId,
					product_id: productData.id,
					price: productData.price,
					stock: productData.stock,
				})
			);
			productsToDecremet.push(this.decrementProduct(productInDB, productData));
		}

		// Recording sale details
		await Promise.all(saleRecord);
		// Decresing the stock of products that have just entered
		await Promise.all(productsToDecremet);
	};

	static decrementProduct = async (productInDB: IProductModel, productData: IProductData) => {
		if (productInDB.dataValues.stock - productData.stock < 0) {
			throw boom.badData(
				`No hay sufuciente stock. El stock del producto es ${productInDB.dataValues.stock} y el stock requerido es de ${productData.stock}`
			);
		}

		return await productInDB.decrement({ stock: productData.stock });
	};

	static update = async (saleId: number, fieldsToUpdate: ISaleFields) => {
		if (Object.keys(fieldsToUpdate).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		await SaleModel.update(fieldsToUpdate, { where: { id: saleId } });
		const sale = await this.getById(saleId);

		return sale;
	};

	static destroy = async (saleId: number) => {
		const sale = (await this.getById(saleId, true)) as ISaleModel;
		await sale.destroy();
	};
}
