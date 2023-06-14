import express from 'express';

const app = express();

app.get('/', (_, res) => {
	res.send('HOLA MUNDO');
});

const PORT = 8000;

app.listen(PORT, () => {
	console.log('Applicacion en puerto ' + PORT);
});
