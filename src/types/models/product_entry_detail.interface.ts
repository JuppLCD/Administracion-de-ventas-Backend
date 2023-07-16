import type { Model, Optional } from 'sequelize';

export interface IProductEntryDetail {
	id: number;

	product_entry_id: number;
	product_id: number;

	stock: number;
	price: number;
}

type IProductEntryDetailCreationAttributes = Optional<IProductEntryDetail, 'id'>;

export type IProductEntryDetailModel = Model<IProductEntryDetail, IProductEntryDetailCreationAttributes>;
