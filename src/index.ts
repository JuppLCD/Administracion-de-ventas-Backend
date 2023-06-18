import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

import { router } from './routes';
app.use('/api', router);

app.get('/', (_, res) => {
	res.send('HOLA MUNDO');
});

import { notFound, logErrors, clientErrorHandler, errorHandler } from './middlewares/error';
app.use(notFound);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log('Applicacion en puerto ' + PORT);
});
