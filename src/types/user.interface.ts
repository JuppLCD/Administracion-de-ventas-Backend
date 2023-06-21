export interface IUser {
	id: number;
	email: string;
	code: string;
}

export type IPayloadJWTCode = Omit<IUser, 'code'>;
