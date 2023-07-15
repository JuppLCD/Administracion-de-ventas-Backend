import type { Model, Optional } from 'sequelize';

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

export type IVoucherType = 'FACTURA A' | 'FACTURA B' | 'FACTURA C';
export type IVoucherSeries = 'Serie VD-01' | 'Serie VD-02' | 'Serie C-01' | 'Serie C-02' | 'Serie C-03';

type IProductEntryCreationAttributes = Optional<IProductEntry, 'id'>;

export type IProductEntryModel = Model<IProductEntry, IProductEntryCreationAttributes>;
