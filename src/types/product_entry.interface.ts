import type { Model, Optional } from 'sequelize';

export interface IProductEntry {
	id: number;

	user_id: number;
	provider_id: number;

	voucher_type: string;
	voucher_series: string;
	voucher_number: string;
	date: string; // 'YYYY-MM-DD hh:mm:ss'

	tax: number;
	total: number;
}

type IProductEntryCreationAttributes = Optional<IProductEntry, 'id'>;

export type IProductEntryModel = Model<IProductEntry, IProductEntryCreationAttributes>;
