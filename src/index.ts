import app from './app';
import connectToDB from './db';

app.listen(app.get('port'), () => {
	console.log(`Server on port ${app.get('port')}`);
	connectToDB();
});
