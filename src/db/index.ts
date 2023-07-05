import { sequelize } from './connection';

// Models
import userSchema from './../models/user';
const UserModel = userSchema(sequelize);

export default async function connectToDB() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		return sequelize;
	} catch (err) {
		console.error('Unable to connect to the database: ', err);
	}
}

export { UserModel };
