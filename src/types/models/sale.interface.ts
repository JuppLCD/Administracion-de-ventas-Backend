import type { Model, Optional } from 'sequelize';
import type { IVoucherSeries, IVoucherType } from './../voucher.interface';

export interface ISale {
	id: number;

	user_id: number;
	client_id: number;

	voucher_type: IVoucherType;
	voucher_series: IVoucherSeries;
	voucher_number: string;
	date: string; // 'YYYY-MM-DD hh:mm:ss'

	tax: number;
	total: number;
}

type ISaleCreationAttributes = Optional<ISale, 'id' | 'date'>;

export type ISaleModel = Model<ISale, ISaleCreationAttributes>;
