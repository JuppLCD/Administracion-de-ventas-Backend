import boom from '@hapi/boom';

import { CategoryModel } from '../db';

import type { ICategoryModel } from '../types/models/category.interface';
import type { ICategoryToStore, ICategoryFields } from '../types/services/category.interface';

export class CategoryServices {
	static getAll = async () => {
		const categories = await CategoryModel.findAll();
		return categories.map((c) => c.toJSON());
	};

	static getById = async (categoryId: number, returnModel = false) => {
		const category = await CategoryModel.findOne({
			where: {
				id: categoryId,
			},
		});

		if (!category) {
			throw boom.notFound('La caregoria no existente en la base de datos');
		}

		return returnModel ? category : category.toJSON();
	};

	static store = async (newCategory: ICategoryToStore) => {
		const category = await CategoryModel.create(newCategory);
		return category.toJSON();
	};

	static update = async (categoryId: number, fieldsToUpdate: ICategoryFields) => {
		if (Object.keys(fieldsToUpdate).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		await CategoryModel.update(fieldsToUpdate, { where: { id: categoryId } });
		const category = await this.getById(categoryId);

		return category;
	};

	static destroy = async (categoryId: number) => {
		const category = (await this.getById(categoryId, true)) as ICategoryModel;
		await category.destroy();
	};
}
