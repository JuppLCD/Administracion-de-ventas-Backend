import type { Model, Optional } from 'sequelize';

export interface IProduct {
	id: number;
	category_id: number;

	name: string;
	description: string;
	code: string;
	img: string;

	price: number;
	stock: number;
}

type IProductCreationAttributes = Optional<IProduct, 'id'>;

export type IProductModel = Model<IProduct, IProductCreationAttributes>;
