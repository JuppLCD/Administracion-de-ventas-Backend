import { ISale } from '../models/sale.interface';
import type { IProductData } from './product.interface';

export type ISaleData = Omit<ISale, 'id' | 'tax' | 'total' | 'date' | 'voucher_number'> & {
	products: IProductData[];
	voucher_number?: string;
};

export type ISaleFields = Partial<Omit<ISale, 'id'>>;
