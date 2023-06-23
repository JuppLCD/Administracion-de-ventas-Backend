import { Sequelize } from 'sequelize';

import { ENV } from '../config';

// URI = '<dialect>://<user>:<pass>@<localhost>:<port>/<dbname>'
export const sequelize = new Sequelize(ENV.DB_CONNECTION_URI, {
	logging: console.log, // Or false
});
