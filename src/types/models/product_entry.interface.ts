import type { Model, Optional } from 'sequelize';

import type { IVoucherSeries, IVoucherType } from '../voucher.interface';

export interface IProductEntry {
	id: number;

	user_id: number;
	provider_id: number;

	voucher_type: IVoucherType;
	voucher_series: IVoucherSeries;
	voucher_number: string;
	date: string; // 'YYYY-MM-DD hh:mm:ss'

	tax: number;
	total: number;
}

type IProductEntryCreationAttributes = Optional<IProductEntry, 'id' | 'date'>;

export type IProductEntryModel = Model<IProductEntry, IProductEntryCreationAttributes>;
