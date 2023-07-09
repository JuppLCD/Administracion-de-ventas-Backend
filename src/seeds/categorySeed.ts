import { CategoryModel } from '../db';

export async function categorySeed() {
	await CategoryModel.create({ name: 'Alimentos', description: 'Comida y bebidas' });
	await CategoryModel.create({ name: 'Ropa', description: 'Todo tipo de prendas' });
	await CategoryModel.create({
		name: 'Electrodomesticos',
		description: 'Cualquier aparato electronico que pueda ser colocado en una casa',
	});
}
