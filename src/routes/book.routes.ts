import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
class BookRoutes {
	private router: Router;
	private bookController: BookController;
	private authMiddleware: AuthMiddleware;

	constructor() {
		this.router = Router();
		this.bookController = new BookController();
		this.authMiddleware = new AuthMiddleware();
	}

	getRoutes(): Router {
		this.router.post('/', this.authMiddleware.auth.bind(this.authMiddleware), this.bookController.store.bind(this.bookController));



		return this.router;
	}

}

export { BookRoutes };
