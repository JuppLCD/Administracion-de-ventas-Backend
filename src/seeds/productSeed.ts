import { faker } from '@faker-js/faker';

import { ProductModel, CategoryModel } from '../db';
import createCode from '../utils/createCode';

export async function productSeed() {
	const allCategories = await CategoryModel.findAll();
	const productsToGenerate = 15;

	for (let i = 0; i < productsToGenerate; i++) {
		const categoryIndex = Math.floor(Math.random() * allCategories.length);
		const category = allCategories[categoryIndex].dataValues;

		await ProductModel.create({
			category_id: category.id,

			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			code: createCode(5),
			img: 'https://dummyimage.com/300x200/000/fff.png',
			price: faker.number.float({ min: 10, max: 600, precision: 0.01 }),
			stock: faker.number.int({ min: 1, max: 50 }),
		});
	}
}
