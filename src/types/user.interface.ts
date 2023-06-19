export interface IUser {
	code: string;
	id: number;
	email: string;
}

export type IPayloadJWTCode = Omit<IUser, 'code'>;
