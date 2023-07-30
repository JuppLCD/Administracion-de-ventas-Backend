import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { ProductEntryDetailModel, ProductEntryModel, ProductModel } from '../db';

import { addZero } from '../utils/addZero';

import type { IProductEntryFields, IProductEntryToStore } from '../types/services/productEntry.interface';
import type { IProductData } from '../types/services/product.interface';

export class ProductEntryServices {
	static getAll = async () => {
		const productEntries = await ProductEntryModel.findAll();
		return productEntries;
	};

	static getById = async (productEntryId: number) => {
		const productEntry = await ProductEntryModel.findOne({
			where: {
				id: productEntryId,
			},
			// include: [{ model: ProductEntryDetailModel, attributes: ['id', 'stock', 'price', 'product_id'], as: 'tete' }],
		});

		if (!productEntry) {
			throw boom.notFound('La entrada de productos no existente en la base de datos');
		}

		return productEntry;
	};

	static store = async (data: IProductEntryToStore) => {
		return await sequelize.transaction(async (t) => {
			const { total, tax } = this.getTotalAndTaxs(data);

			if (data.voucher_number === undefined) {
				data.voucher_number = await this.generateVoucherNumber();
			}

			const newProductEntry = await ProductEntryModel.create({
				user_id: data.user_id,
				provider_id: data.provider_id,

				voucher_number: data.voucher_number,
				voucher_series: data.voucher_series,
				voucher_type: data.voucher_type,

				total,
				tax,
			});

			for (const product of data.products) {
				this.productEntryRecord(newProductEntry.dataValues.id, product);

				this.incrementProduct(product);
			}

			return newProductEntry;
		});
	};

	static getTotalAndTaxs(data: IProductEntryToStore) {
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
		const lastProductEntry = await ProductEntryModel.findOne({
			order: [['id', 'DESC']],
		});

		if (lastProductEntry !== null) {
			n = lastProductEntry.dataValues.id;
		}

		return addZero(n, 10 - `${n}`.length);
	};

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

	static update = async (productEntryId: number, fieldsToUpdate: IProductEntryFields) => {
		if (Object.keys(fieldsToUpdate).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		await ProductEntryModel.update(fieldsToUpdate, { where: { id: productEntryId } });
		const productEntry = await this.getById(productEntryId);

		return productEntry;
	};

	static destroy = async (productEntryId: number) => {
		const productEntry = await this.getById(productEntryId);
		await productEntry.destroy();
	};
}
