import { faker } from '@faker-js/faker';

import { CategoryModel } from '../db';

export async function categorySeed(categoriesToGenerate: number = 5) {
	let categoriesNames: Set<string> = new Set();

	while (categoriesNames.size < categoriesToGenerate) {
		categoriesNames.add(faker.commerce.department());
	}

	const names = Array.from(new Set(categoriesNames));
	for (let i = 0; i < categoriesToGenerate; i++) {
		await CategoryModel.create({ name: names[i], description: faker.lorem.paragraph() });
	}
}
