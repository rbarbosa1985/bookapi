
class DbConnection {
	async connect() {
		try {

			console.log('connect to database');
		} catch (error) {
			console.log('Error to coneect database: ' + error);
		}
	}
}

export { DbConnection };


