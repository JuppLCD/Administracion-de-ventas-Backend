import { faker } from '@faker-js/faker';

import { PersonModel, ProductEntryDetailModel, ProductEntryModel, ProductModel } from '../db';

import type { Sequelize } from 'sequelize';
import type { IVoucherSeries, IVoucherType } from '../types/product_entry.interface';

export async function productEntrySeed(sequelize: Sequelize, productEntriesToGenerate: number = 5) {
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

		let total = data.products.reduce((prev, curr) => {
			return prev + curr.price * curr.stock;
		}, 0);

		const IVA_PRODUCTS = total * 0.21;
		const OTHER_TAXES = (total - IVA_PRODUCTS) * 0.1;

		total += OTHER_TAXES;

		const tax = IVA_PRODUCTS + OTHER_TAXES; // import taxes, etc.

		await sequelize.transaction(async (t) => {
			const productEntry = await ProductEntryModel.create({
				user_id: data.user_id,
				provider_id: data.provider_id,

				voucher_number: data.voucher_number,
				voucher_series: data.voucher_series,
				voucher_type: data.voucher_type,

				date: getCurrentDateDBFormat(),
				total,
				tax,
			});

			for (const product of data.products) {
				await ProductEntryDetailModel.create({
					product_entry_id: productEntry.dataValues.id,
					product_id: product.id,
					price: product.price,
					stock: product.stock,
				});

				const productInDB = await ProductModel.findOne({ where: { id: product.id } });
				await productInDB?.increment({ stock: product.stock });
			}
		});
	}
}

function getCurrentDateDBFormat() {
	const date = new Date();

	const year = date.getFullYear();
	const month = addZero(date.getMonth() + 1);
	const day = addZero(date.getDate());
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const seconds = addZero(date.getSeconds());

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function addZero(n: number, repeat: number = 1) {
	if (n < 10) {
		return '0'.repeat(repeat) + n;
	}
	return `${n}`;
}
