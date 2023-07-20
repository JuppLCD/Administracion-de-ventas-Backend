import { faker } from '@faker-js/faker';

import { VOUCHER_SERIES, VOUCHER_TYPE } from '../config';

import { PersonModel, ProductModel, SaleModel } from '../db';

import { addZero } from '../utils/dateFormat';

import { SaleServices } from '../services/sale';

export async function saleSeed(saleToGenerate: number = 5) {
	const possibleClients = await PersonModel.findAll();
	if (!possibleClients || possibleClients.length === 0) {
		throw new Error('No hay proveedors cargados en la DB');
	}

	const possibleProducts = await ProductModel.findAll();
	if (!possibleProducts || possibleProducts.length === 0) {
		throw new Error('No hay productos cargados en la DB');
	}

	for (let i = 0; i < saleToGenerate; i++) {
		const productsToSale = faker.helpers.arrayElements(possibleProducts, { min: 2, max: possibleProducts.length });

		let vaucher_number = 0;
		const lastSale = await SaleModel.findOne({
			order: [['id', 'DESC']],
		});
		if (lastSale) {
			vaucher_number = lastSale.dataValues.id;
		}

		const data = {
			user_id: 1,
			client_id: faker.helpers.arrayElement(possibleClients).dataValues.id,

			voucher_number: addZero(vaucher_number, 10 - `${vaucher_number}`.length), // "0000000000", "0000000001", "0005800110", etc
			voucher_series: faker.helpers.arrayElement(VOUCHER_SERIES),
			voucher_type: faker.helpers.arrayElement(VOUCHER_TYPE),

			products: productsToSale.map((product) => ({
				id: product.dataValues.id,
				price: product.dataValues.price * 0.7,
				code: product.dataValues.code,
				stock: faker.number.int({ min: 1, max: 50 }),
			})),
		};

		await SaleServices.newSale(data);
	}
}
