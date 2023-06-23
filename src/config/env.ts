// Fundamental variables for NodeJS
if (!process.env.PORT) {
	console.log('The port of the app was not placed in the environment variables, so it will run on port 8000');
	process.env.PORT = '8000';
}

// Fundamental variables for DB
if (!process.env.DB_CONNECTION_URI) {
	// URI = '<dialect>://<user>:<pass>@<localhost>:<port>/<dbname>'
	throw new Error('The variable "DB_CONNECTION_URI" cannot be found among the environment variables');
}

// Fundamental variable for JWT
if (!process.env.JWT_SECRET_KEY) {
	throw new Error('The variable "JWT_SECRET_KEY" cannot be found among the environment variables');
}

// Fundamental variables for MAILER
if (!process.env.MAILER_EMAIL || !process.env.MAILER_PASSWORD) {
	throw new Error('The variable "MAILER_EMAIL" or "MAILER_PASSWORD" cannot be found among the environment variables');
}

export const ENV = {
	// Settings NodeJS
	PORT: Number(process.env.PORT),

	// Settings DB
	DB_CONNECTION_URI: process.env.DB_CONNECTION_URI,

	// JWT
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

	// MAILER
	MAILER_HOST: process.env.MAILER_HOST ?? 'smtp.ethereal.email',
	MAILER_PORT: Number(process.env.MAILER_PORT ?? 587),
	MAILER_SECURE: process.env.MAILER_SECURE === 'true',
	MAILER_EMAIL: process.env.MAILER_EMAIL,
	MAILER_PASSWORD: process.env.MAILER_PASSWORD,
};
