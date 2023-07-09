import type { Model, Optional } from 'sequelize';

export interface IPerson {
	id: number;

	type_person: number;
	document_type: string;
	document_number: string;
	phone: string;
	address: string;
}

type IPersonCreationAttributes = Optional<IPerson, 'id'>;

export type IPersonModel = Model<IPerson, IPersonCreationAttributes>;
