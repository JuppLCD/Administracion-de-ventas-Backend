import boom from '@hapi/boom';

import { CategoryModel } from '../db';
import { ICategoryToStore, ICategoryToUpdate } from '../types/services/category.interface';

export class CategoryServices {
	static getAll = async () => {
		const categories = await CategoryModel.findAll();
		return categories;
	};

	static getById = async (categoryId: number) => {
		const category = await CategoryModel.findOne({
			where: {
				id: categoryId,
			},
		});

		if (!category) {
			throw boom.notFound('La caregoria no existente en la base de datos');
		}

		return category;
	};

	static store = async (newCategory: ICategoryToStore) => {
		const category = await CategoryModel.create(newCategory);
		return category;
	};

	static update = async (categoryId: number, fieldsToUpdate: ICategoryToUpdate) => {
		if (Object.keys(fieldsToUpdate).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		await CategoryModel.update(fieldsToUpdate, { where: { id: categoryId } });
		const category = await this.getById(categoryId);

		return category;
	};

	static destroy = async (categoryId: number) => {
		const category = await this.getById(categoryId);
		await category.destroy();
	};
}
