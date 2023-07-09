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

			name: `Product - ${i + 1}`,
			description: `Producto generado automaticamente nro ${i + 1}`,
			code: createCode(5),
			img: 'https://dummyimage.com/300x200/000/fff.png',
			price: 500,
			stock: 5,
		});
	}
}
