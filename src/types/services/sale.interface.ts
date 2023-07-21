import { ISale } from '../models/sale.interface';
import type { IProductData } from './product.interface';

export type ISaleData = Omit<ISale, 'id' | 'tax' | 'total' | 'date'> & { products: IProductData[] };

export type ISaleFields = Partial<Omit<ISale, 'id'>>;
