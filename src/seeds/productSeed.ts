import { faker } from '@faker-js/faker';

import { ProductModel, CategoryModel } from '../db';
import createCode from '../utils/createCode';

export async function productSeed(productsToGenerate: number = 30) {
	const allCategories = await CategoryModel.findAll();

	for (let i = 0; i < productsToGenerate; i++) {
		const categoryIndex = Math.floor(Math.random() * allCategories.length);
		const category = allCategories[categoryIndex].dataValues;

		await ProductModel.create({
			category_id: category.id,

			name: faker.commerce.productName(),
			type: faker.commerce.product(),
			description: faker.commerce.productDescription(),
			code: createCode(5),
			img: 'https://dummyimage.com/300x200/000/fff.png',
			price: parseFloat(faker.commerce.price()),
			stock: 0, // faker.number.int({ min: 1, max: 50 })
		});
	}
}
