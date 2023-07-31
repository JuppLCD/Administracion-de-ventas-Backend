import boom from '@hapi/boom';

import { sequelize } from '../db/connection';
import { ProductEntryDetailModel, ProductEntryModel, ProductModel } from '../db';

import { addZero } from '../utils/addZero';

import type { IProductModel } from '../types/models/product.interface';
import type { IProductEntryDetailModel } from '../types/models/product_entry_detail.interface';
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
			include: { model: ProductEntryDetailModel, as: 'details', attributes: ['id', 'stock', 'price', 'product_id'] },
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

			// Registration of the details of the entry of products and its increase
			this.recordDetailsAndIncrement(data, newProductEntry.dataValues.id);

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

	static recordDetailsAndIncrement = async (data: IProductEntryToStore, productEntryId: number) => {
		// Getting the products that come in
		const productsToFind = data.products.map((product) =>
			ProductModel.findOne({
				where: {
					id: product.id,
					// code: product.code // ! Quitar luego, es para no tener que estar buscando el codigo de un producto en la DB
				},
			})
		);
		const products = await Promise.all(productsToFind);

		const productsToIncrement: Promise<IProductModel>[] = [];
		const productEntryRecord: Promise<IProductEntryDetailModel>[] = [];
		for (const productInDB of products) {
			if (productInDB === null) {
				throw boom.notFound(`El producto no exite en la DB`);
			}
			const productData = data.products.find((p) => p.id === productInDB.dataValues.id) as IProductData;

			productEntryRecord.push(
				ProductEntryDetailModel.create({
					product_entry_id: productEntryId,
					product_id: productData.id,
					price: productData.price,
					stock: productData.stock,
				})
			);
			productsToIncrement.push(productInDB.increment({ stock: productData.stock }));
		}

		// Recording product entry details
		await Promise.all(productEntryRecord);
		// Increasing the stock of products that have just entered
		await Promise.all(productsToIncrement);
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
