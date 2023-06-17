import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
	res.send('HOLA MUNDO');
});

app.listen(PORT, () => {
	console.log('Applicacion en puerto ' + PORT);
});
