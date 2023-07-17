import boom from '@hapi/boom';
import { Op } from 'sequelize';

import { ProductModel } from '../db';

import type { IProductSearchByField, IProductToStore, IProductToUpdate } from '../types/services/product.interface';

export class ProductServices {
	static getAll = async () => {
		const products = await ProductModel.findAll();
		return products;
	};

	static getById = async (productId: number) => {
		const product = await ProductModel.findOne({ where: { id: productId } });

		if (!product) {
			throw boom.notFound('El producto no existente en la base de datos');
		}

		return product;
	};

	static getAllByCategory = async (categoryId: number) => {
		const products = await ProductModel.findAll({
			where: { category_id: categoryId },
		});

		return products;
	};

	static searchAllByField = async (searchByField: IProductSearchByField) => {
		if (Object.keys(searchByField).length === 0) {
			throw boom.badData('No hay campos para buscar');
		}

		const formattedSearchByField = Object.fromEntries(
			Object.entries(searchByField).map(([key, value]) => [key, { [Op.like]: `%${value}%` }])
		);

		const products = await ProductModel.findAll({
			where: formattedSearchByField,
		});

		return products;
	};

	static store = async (newProduct: IProductToStore) => {
		const product = await ProductModel.create(newProduct);
		return product;
	};

	static update = async (productId: number, fieldsToUpdate: IProductToUpdate) => {
		if (Object.keys(fieldsToUpdate).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		const product = await ProductModel.update(fieldsToUpdate, { where: { id: productId } });

		return product;
	};

	static destroy = async (productId: number) => {
		const product = await this.getById(productId);
		await product.destroy();
	};
}
