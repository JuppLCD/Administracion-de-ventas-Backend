import { IProduct } from '../models/product.interface';

export type IProductToStore = Omit<IProduct, 'id'>;
export type IProductToUpdate = Partial<IProductToStore>;
export type IProductSearchByField = Partial<Pick<IProduct, 'code' | 'description' | 'name' | 'type'>>;
