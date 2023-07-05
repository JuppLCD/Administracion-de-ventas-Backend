import { UserModel } from '../db';

export async function userSeed() {
	await UserModel.create({ email: 'test@test.com', code: '', expire_code: '' });
	await UserModel.create({ email: 'test1@test.com', code: '', expire_code: '' });
	await UserModel.create({ email: 'test2@test.com', code: '', expire_code: '' });
}
