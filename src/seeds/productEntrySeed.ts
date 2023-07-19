import { faker } from '@faker-js/faker';

import { PersonModel, ProductEntryModel, ProductModel } from '../db';

import { addZero } from '../utils/dateFormat';

import { ProductEntryServices } from '../services/productEntry';

import type { IVoucherSeries, IVoucherType } from '../types/voucher.interface';

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

		let vaucher_number = 0;
		const lastProductEntry = await ProductEntryModel.findOne({
			order: [['id', 'DESC']],
		});
		if (lastProductEntry) {
			vaucher_number = lastProductEntry.dataValues.id;
		}

		const possibleVaucherType: IVoucherType[] = ['FACTURA A', 'FACTURA B', 'FACTURA C'];
		const possibleVaucherSeries: IVoucherSeries[] = [
			'Serie VD-01',
			'Serie VD-02',
			'Serie C-01',
			'Serie C-02',
			'Serie C-03',
		];

		const data = {
			user_id: 1,
			provider_id: faker.helpers.arrayElement(possibleProviders).dataValues.id,

			voucher_number: addZero(vaucher_number, 10 - `${vaucher_number}`.length), // "0000000000", "0000000001", "0005800110", etc
			voucher_series: faker.helpers.arrayElement(possibleVaucherSeries),
			voucher_type: faker.helpers.arrayElement(possibleVaucherType),

			products: productsThatEnter.map((product) => ({
				id: product.dataValues.id,
				price: product.dataValues.price * 0.7,
				code: product.dataValues.code,
				stock: faker.number.int({ min: 1, max: 50 }),
			})),
		};

		await ProductEntryServices.newProductEntry(data);
	}
}
