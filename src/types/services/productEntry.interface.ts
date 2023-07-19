import type { IVoucherSeries, IVoucherType } from '../voucher.interface';
import type { IProductData } from './product.interface';

export interface IProductEntryData {
	user_id: number;
	provider_id: number;
	voucher_number: string;
	voucher_series: IVoucherSeries;
	voucher_type: IVoucherType;
	products: IProductData[];
}
