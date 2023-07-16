import type { Model, Optional } from 'sequelize';

export interface IPerson {
	id: number;

	type_person: ITypePerson;
	document_type: ITypeDocument;
	document_number: string;

	phone: string;
	address: string;
	name: string;
}

export type ITypePerson = 'Natural' | 'Legal';
export type ITypeDocument = 'CUIT' | 'DNI' | 'Pasaporte' | 'Cédula de Identidad';

type IPersonCreationAttributes = Optional<IPerson, 'id'>;

export type IPersonModel = Model<IPerson, IPersonCreationAttributes>;
