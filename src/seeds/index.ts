import { ENV } from '../config';

import connectToDB from '../db';

import { userSeed } from './userSeed';

async function seedDB() {
	const sequelize = await connectToDB();

	if (!sequelize) {
		console.log('Error al cargar las seeds en la DB');
		return;
	}

	try {
		await sequelize.sync({ force: true });

		await userSeed();

		console.log('##################################');
		console.log('Se Cargaron todas las seeds en la DB');
		await sequelize.close();
	} catch (err) {
		console.log('Error al cargar las seeds en la DB');
		console.log('##################################');
		console.log(err);
	}
}

if (ENV.NODE_ENV === 'dev') {
	seedDB();
} else {
	throw new Error('Solo se puede hacer seed en la DB si la variable de entorno "NODE_ENV" no es "dev"');
}
