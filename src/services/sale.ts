import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { SaleModel, SaleDetailModel, ProductModel } from '../db';

import { getCurrentDateDBFormat } from '../utils/dateFormat';

import type { ISaleData, ISaleFields } from '../types/services/sale.interface';
import type { IProductData } from '../types/services/product.interface';

export class SaleServices {
	static getAll = async () => {
		const sales = await SaleModel.findAll();
		return sales;
	};

	static getById = async (saleId: number) => {
		const sale = await SaleModel.findOne({
			where: {
				id: saleId,
			},
		});

		if (!sale) {
			throw boom.notFound('La venta no existente en la base de datos');
		}

		return sale;
	};

	static store = async (data: ISaleData) => {
		return await sequelize.transaction(async (t) => {
			const { total, tax } = this.getTotalAndTaxs(data);
			const newSale = await SaleModel.create({
				user_id: data.user_id,
				client_id: data.client_id,

				voucher_number: data.voucher_number,
				voucher_series: data.voucher_series,
				voucher_type: data.voucher_type,

				date: getCurrentDateDBFormat(),
				total,
				tax,
			});

			for (const product of data.products) {
				this.productSaleRecord(newSale.dataValues.id, product);

				this.decrementProduct(product);
			}

			return newSale;
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

	static productSaleRecord = async (saleId: number, product: IProductData) => {
		await SaleDetailModel.create({
			sale_id: saleId,
			product_id: product.id,
			price: product.price,
			stock: product.stock,
		});
	};

	static decrementProduct = async (product: IProductData) => {
		const productInDB = await ProductModel.findOne({ where: { id: product.id, code: product.code } });

		if (!productInDB) {
			throw boom.notFound('El producto no exite en la DB');
		}

		if (productInDB.dataValues.stock - product.stock < 0) {
			throw boom.badData(
				`No hay sufuciente stock. El stock del producto es ${productInDB.dataValues.stock} y el stock requerido es de ${product.stock}`
			);
		}

		await productInDB.decrement({ stock: product.stock });
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
		const sale = await this.getById(saleId);
		await sale.destroy();
	};
}
