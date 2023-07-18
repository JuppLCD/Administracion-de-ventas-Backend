import { IProduct } from '../models/product.interface';

export type IProductToStore = Omit<IProduct, 'id'>;
export type IProductFields = Partial<IProductToStore>;
export type IProductSearchByField = Partial<Pick<IProduct, 'code' | 'description' | 'name' | 'type'>>;
