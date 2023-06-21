import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

// Settings
if (!process.env.PORT) {
	console.log('The port of the app was not placed in the environment variables, so it will run on port 8000');
}
app.set('port', Number(process.env.PORT ?? 8000));

// Middlewares
app.use(cors());
app.use(express.json());

// Router api
import { router } from './routes';
app.use('/api', router);

app.get('/', (_, res) => {
	res.send('HOLA MUNDO');
});

// Errors
import { notFound, logErrors, clientErrorHandler, errorHandler } from './middlewares/error';
app.use(notFound);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
