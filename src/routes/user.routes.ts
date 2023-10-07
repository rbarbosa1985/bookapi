import { Router } from 'express';
import { UserController } from '../controllers/UserController';

class UserRoutes {
	private router: Router;
	private userController = new UserController();

	constructor() {
		this.router = Router();
	}

	getRoutes() {
		this.router.get('/', this.userController.index.bind(this.userController));
		this.router.get('/paged', this.userController.indexPaged.bind(this.userController));
		this.router.post('/', this.userController.store.bind(this.userController));
		return this.router;
	}

}

export { UserRoutes };
