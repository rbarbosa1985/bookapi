import 'dotenv/config';
import mongoose from 'mongoose';

class DbConnection {
	async connect() {
		try {
			await mongoose.connect(process.env.NODE_ENV);
			console.log('connect to database');
		} catch (error) {
			console.log('Error to coneect database: ' + error);
		}
	}
}

export { DbConnection };


