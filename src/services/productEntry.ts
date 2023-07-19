import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { ProductEntryDetailModel, ProductEntryModel, ProductModel } from '../db';

import { getCurrentDateDBFormat } from '../utils/dateFormat';

import type { IProductEntryData } from '../types/services/productEntry.interface';
import type { IProductData } from '../types/services/product.interface';

export class ProductEntryServices {
	static newProductEntry = async (data: IProductEntryData) => {
		await sequelize.transaction(async (t) => {
			const { total, tax } = this.getTotalAndTaxs(data);
			const newProductEntry = await ProductEntryModel.create({
				user_id: data.user_id,
				provider_id: data.provider_id,

				voucher_number: data.voucher_number,
				voucher_series: data.voucher_series,
				voucher_type: data.voucher_type,

				date: getCurrentDateDBFormat(),
				total,
				tax,
			});

			for (const product of data.products) {
				this.productEntryRecord(newProductEntry.dataValues.id, product);

				this.incrementProduct(product);
			}
		});
	};

	static getTotalAndTaxs(data: IProductEntryData) {
		let total = data.products.reduce((prev, curr) => {
			return prev + curr.price * curr.stock;
		}, 0);

		const IVA_PRODUCTS = total * 0.21;
		const OTHER_TAXES = (total - IVA_PRODUCTS) * 0.1;

		total += OTHER_TAXES;

		const tax = IVA_PRODUCTS + OTHER_TAXES; // import taxes, etc.

		return { total, tax };
	}

	static productEntryRecord = async (productEntryId: number, product: IProductData) => {
		await ProductEntryDetailModel.create({
			product_entry_id: productEntryId,
			product_id: product.id,
			price: product.price,
			stock: product.stock,
		});
	};

	static incrementProduct = async (product: IProductData) => {
		const productInDB = await ProductModel.findOne({ where: { id: product.id, code: product.code } });

		if (!productInDB) {
			throw boom.notFound('El producto no exite en la DB');
		}

		await productInDB.increment({ stock: product.stock });
	};
}
