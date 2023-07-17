import type { IProduct } from '../models/product.interface';
import type { IVoucherSeries, IVoucherType } from '../models/product_entry.interface';

export interface IProductEntryToStore {
	user_id: number;
	provider_id: number;
	voucher_number: string;
	voucher_series: IVoucherSeries;
	voucher_type: IVoucherType;
	products: ISupplierProduct[];
}

export type ISupplierProduct = Pick<IProduct, 'id' | 'code' | 'price' | 'stock'>;
