import 'dotenv/config';
import mongoose from 'mongoose';

class DbConnection {
	async connect() {
		try {
			const db = process.env.NODE_ENV;
			if (db) {
				await mongoose.connect(db);
				console.log('connect to database');
			} else {
				console.log('Error process env');
			}
		} catch (error) {
			console.log('Error to connect database: ' + error);
		}
	}
}

export { DbConnection };


