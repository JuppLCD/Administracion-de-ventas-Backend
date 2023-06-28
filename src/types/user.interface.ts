import type { Model, Optional } from 'sequelize';

export interface IUser {
	id: number;
	email: string;
	code: string;
	expire_code: string;
}

export type IPayloadJWT = Omit<IUser, 'code'>;

type IUserCreationAttributes = Optional<IUser, 'id'>;

export type IUserModel = Model<IUser, IUserCreationAttributes>;
