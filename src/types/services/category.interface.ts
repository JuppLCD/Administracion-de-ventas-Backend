import { ICategory } from '../models/category.interface';

export type ICategoryToStore = Omit<ICategory, 'id'>;
export type ICategoryFields = Partial<ICategoryToStore>;
