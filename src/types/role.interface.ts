import type { Model, Optional } from 'sequelize';

export interface IRole {
	id: number;

	name: string;
	description: string;
}

type IRoleCreationAttributes = Optional<IRole, 'id'>;

export type IRoleModel = Model<IRole, IRoleCreationAttributes>;
