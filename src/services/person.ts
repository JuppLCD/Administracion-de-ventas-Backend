import boom from '@hapi/boom';

import { PersonModel } from '../db';

import type { IPersonFields, IPersonToStore } from '../types/services/person.interface';

export class PersonServices {
	static getAll = async () => {
		const people = await PersonModel.findAll();
		return people;
	};

	static getById = async (categoryId: number) => {
		const person = await PersonModel.findOne({
			where: {
				id: categoryId,
			},
		});

		if (!person) {
			throw boom.notFound('La persona no existente en la base de datos');
		}

		return person;
	};

	static store = async (newPerson: IPersonToStore) => {
		const person = await PersonModel.create(newPerson);
		return person;
	};

	static update = async (personId: number, fieldsFields: IPersonFields) => {
		if (Object.keys(fieldsFields).length === 0) {
			throw boom.badData('No hay campos para actualizar');
		}

		await PersonModel.update(fieldsFields, { where: { id: personId } });
		const person = await this.getById(personId);

		return person;
	};

	static destroy = async (personId: number) => {
		const person = await this.getById(personId);
		await person.destroy();
	};
}