import type { IUser } from './models/user.interface';

export type IPayloadJWT = Pick<IUser, 'id' | 'role_id' | 'email' | 'fullName'>;
