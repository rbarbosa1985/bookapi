import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { DbConnection } from './database/index';
import { BookRoutes } from './routes/book.routes';
import { UserRoutes } from './routes/user.routes';
import { SwaggerSpec } from './utils/swagger';

const app: Application = express();
const userRoutes = new UserRoutes().getRoutes();
const bookRoutes = new BookRoutes().getRoutes();
const database = new DbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/docs/v1', swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

database.connect();
app.use((err: Error, request: Request, response: Response) => {
	if (err instanceof Error) {
		return response.status(400).json({
			message: err.message,
		});
	}
	return response.status(500).json({
		status: 500,
		message: 'Internal server error'
	});
});

app.listen(3333, () => { console.log('server is running'); });
