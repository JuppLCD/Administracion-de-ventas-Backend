import { faker } from '@faker-js/faker';

import { RoleModel, UserModel } from '../db';

export async function userSeed() {
	const adminRole = await RoleModel.create({ name: 'Admin', description: faker.lorem.paragraph() });
	const sellerRole = await RoleModel.create({ name: 'Seller', description: faker.lorem.paragraph() });

	await UserModel.create({
		email: 'test@test.com',
		role_id: adminRole.dataValues.id,
		code: '',
		expire_code: '',
		address: faker.location.streetAddress({ useFullAddress: true }),
		phone: faker.phone.number('+54 ### ### ## ##'),
		fullName: faker.person.fullName(),
		document_number: `${faker.number.int({ min: 30000000, max: 50000000 })}`,
		document_type: 'DNI',
	});
	await UserModel.create({
		email: 'test1@test.com',
		role_id: adminRole.dataValues.id,
		code: '',
		expire_code: '',
		address: faker.location.streetAddress({ useFullAddress: true }),
		phone: faker.phone.number('+54 ### ### ## ##'),
		fullName: faker.person.fullName(),
		document_number: `${faker.number.int({ min: 30000000, max: 50000000 })}`,
		document_type: 'DNI',
	});
	await UserModel.create({
		email: 'test2@test.com',
		role_id: sellerRole.dataValues.id,
		code: '',
		expire_code: '',
		address: faker.location.streetAddress({ useFullAddress: true }),
		phone: faker.phone.number('+54 ### ### ## ##'),
		fullName: faker.person.fullName(),
		document_number: `${faker.number.int({ min: 30000000, max: 50000000 })}`,
		document_type: 'DNI',
	});
}
