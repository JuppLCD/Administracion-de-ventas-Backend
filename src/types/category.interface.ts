import type { Model, Optional } from 'sequelize';

export interface ICategory {
	id: number;

	name: string;
	description: string;
}

type ICategoryCreationAttributes = Optional<ICategory, 'id'>;

export type ICategoryModel = Model<ICategory, ICategoryCreationAttributes>;
