import { IProductEntry } from '../models/product_entry.interface';
import type { IProductData } from './product.interface';

export type IProductEntryToStore = Omit<IProductEntry, 'id' | 'tax' | 'total' | 'date'> & { products: IProductData[] };

export type IProductEntryFields = Partial<Omit<IProductEntry, 'id'>>;
