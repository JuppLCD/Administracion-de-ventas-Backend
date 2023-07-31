import { ENV } from './config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Settings
app.set('port', ENV.PORT);

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

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
