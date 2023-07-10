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
}

export type IPayloadJWT = Omit<IUser, 'code'>;

type IUserCreationAttributes = Optional<IUser, 'id'>;

export type IUserModel = Model<IUser, IUserCreationAttributes>;
