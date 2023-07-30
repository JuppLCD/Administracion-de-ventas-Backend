import { faker } from '@faker-js/faker';

import { PersonModel, ProductModel } from '../db';

import { ProductEntryServices } from '../services/productEntry';

import { VOUCHER_SERIES, VOUCHER_TYPE } from '../config';

export async function productEntrySeed(productEntriesToGenerate: number = 5) {
	const possibleProviders = await PersonModel.findAll({
		where: {
			type_person: 'Legal',
		},
	});
	if (!possibleProviders || possibleProviders.length === 0) {
		throw new Error('No hay proveedors cargados en la DB');
	}

	const possibleProducts = await ProductModel.findAll();
	if (!possibleProducts || possibleProducts.length === 0) {
		throw new Error('No hay productos cargados en la DB');
	}

	for (let i = 0; i < productEntriesToGenerate; i++) {
		const productsThatEnter = faker.helpers.arrayElements(possibleProducts, { min: 2, max: possibleProducts.length });

		const data = {
			user_id: 1,
			provider_id: faker.helpers.arrayElement(possibleProviders).dataValues.id,

			voucher_series: faker.helpers.arrayElement(VOUCHER_SERIES),
			voucher_type: faker.helpers.arrayElement(VOUCHER_TYPE),

			products: productsThatEnter.map((product) => ({
				id: product.dataValues.id,
				price: product.dataValues.price * 0.7,
				code: product.dataValues.code,
				stock: faker.number.int({ min: 20, max: 60 }),
			})),
		};

		await ProductEntryServices.store(data);
	}
}
