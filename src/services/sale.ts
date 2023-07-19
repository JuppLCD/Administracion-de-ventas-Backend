import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { SaleModel, SaleDetailModel, ProductModel } from '../db';

import { getCurrentDateDBFormat } from '../utils/dateFormat';

import type { ISaleData } from '../types/services/sale.interface';
import type { IProductData } from '../types/services/product.interface';

export class SaleServices {
	static newSale = async (data: ISaleData) => {
		await sequelize.transaction(async (t) => {
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
}
