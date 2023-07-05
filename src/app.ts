import { ENV } from './config';

import express from 'express';
import cors from 'cors';

const app = express();

// Settings
app.set('port', ENV.PORT);

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
