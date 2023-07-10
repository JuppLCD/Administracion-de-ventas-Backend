import type { Model, Optional } from 'sequelize';

export interface IPerson {
	id: number;

	type_person: number; // values "0" for natural person or "1" for legal  person
	document_type: string;
	document_number: string;

	phone: string;
	address: string;
	name: string;
}

// type ITypePerson = 'Natural person' | 'Legal person';

type IPersonCreationAttributes = Optional<IPerson, 'id'>;

export type IPersonModel = Model<IPerson, IPersonCreationAttributes>;
