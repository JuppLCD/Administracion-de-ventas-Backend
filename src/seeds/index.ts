import { ENV } from '../config';

import connectToDB from '../db';

import { userSeed } from './userSeed';
import { categorySeed } from './categorySeed';
import { productSeed } from './productSeed';

async function seedDB() {
	const sequelize = await connectToDB();

	if (!sequelize) {
		console.log('Error seeding database');
		return;
	}

	try {
		await sequelize.sync({ force: true });

		await userSeed();
		console.log('User seeding was done successfully');
		await categorySeed();
		console.log('Category seeding was done successfully');
		await productSeed();
		console.log('Product seeding was done successfully');

		console.log('##################################');
		console.log('The seeding of the database was carried out correctly');
		console.log('##################################');
		await sequelize.close();
	} catch (err) {
		console.log('##################################');
		console.log('Error seeding database');
		console.log('##################################');
		console.log(err);
	}
}

if (ENV.NODE_ENV === 'dev') {
	seedDB();
} else {
	throw new Error('Seeding can only be done in the database if the environment variable "NODE_ENV = dev"');
}
