import { RoleModel, UserModel } from '../db';

export async function userSeed() {
	await RoleModel.create({ name: 'Admin', description: '' });
	await RoleModel.create({ name: 'Seller', description: '' });

	await UserModel.create({
		email: 'test@test.com',
		role_id: 1,
		code: '',
		expire_code: '',
		address: '',
		phone: '',
		document_number: '',
		document_type: '',
	});
	await UserModel.create({
		email: 'test1@test.com',
		role_id: 1,
		code: '',
		expire_code: '',
		address: '',
		phone: '',
		document_number: '',
		document_type: '',
	});
	await UserModel.create({
		email: 'test2@test.com',
		role_id: 2,
		code: '',
		expire_code: '',
		address: '',
		phone: '',
		document_number: '',
		document_type: '',
	});
}
