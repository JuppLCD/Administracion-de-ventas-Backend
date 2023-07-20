import { faker } from '@faker-js/faker';

import { PersonModel } from '../db';

import { ITypeDocument } from '../types/models/person.interface';
import { TYPE_PERSON } from '../config';

export async function personSeed(PersonsToGenerate: number = 10) {
	for (let i = 0; i < PersonsToGenerate; i++) {
		const type_person = faker.helpers.arrayElement(TYPE_PERSON);
		let name = '';
		let document_type: ITypeDocument = 'DNI';
		let document_number = '';

		if (type_person === 'Natural') {
			name = faker.person.fullName();
			document_type = 'DNI';
			document_number = `${faker.number.int({ min: 30000000, max: 50000000 })}`;
		} else {
			name = faker.company.name();
			document_type = 'CUIT';
			document_number = `${faker.number.int({ min: 10000000000, max: 90000000000 })}`;
		}

		await PersonModel.create({
			type_person,
			document_number,
			document_type,
			name,
			phone: faker.phone.number('+54 ### ### ## ##'),
			address: faker.location.streetAddress({ useFullAddress: true }),
		});
	}
}
