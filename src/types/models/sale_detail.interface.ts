import type { Model, Optional } from 'sequelize';

export interface ISaleDetail {
	id: number;

	sale_id: number;
	product_id: number;

	stock: number;
	price: number;
}

type ISaleDetailCreationAttributes = Optional<ISaleDetail, 'id'>;

export type ISaleDetailModel = Model<ISaleDetail, ISaleDetailCreationAttributes>;
