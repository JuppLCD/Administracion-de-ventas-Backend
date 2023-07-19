import { IPerson } from '../models/person.interface';

export type IPersonToStore = Omit<IPerson, 'id'>;
export type IPersonFields = Partial<IPersonToStore>;
