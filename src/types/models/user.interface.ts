import type { Model, Optional } from 'sequelize';

export interface IUser {
	id: number;
	role_id: number;

	email: string;
	code: string;
	expire_code: string;

	document_type: string;
	document_number: string;

	phone: string;
	address: string;
	fullName: string;
}

// TODO: Ver que tipos de documentos hay
// export type IDocumentType = 'DNI' | 'Cédula de identidad' | 'Pasaporte';

type IUserCreationAttributes = Optional<IUser, 'id'>;

export type IUserModel = Model<IUser, IUserCreationAttributes>;
