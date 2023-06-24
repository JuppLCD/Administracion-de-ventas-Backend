export interface IUser {
	id: number;
	email: string;
	code: string;
	expire_code: string;
}

export type IPayloadJWT = Omit<IUser, 'code'>;
