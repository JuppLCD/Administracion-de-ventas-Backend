import { Sequelize } from 'sequelize';

if (!process.env.DB_CONNECTION_URI) {
	throw new Error('The variable "DB_CONNECTION_URI" cannot be found among the environment variables');
}

// URI = '<dialect>://<user>:<pass>@<localhost>:<port>/<dbname>'
export const sequelize = new Sequelize(process.env.DB_CONNECTION_URI, {
	logging: console.log, // Or false
});
