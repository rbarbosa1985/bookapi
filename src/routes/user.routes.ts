import { Router } from 'express';
import { UserController } from '../controllers/UserController';

class UserRoutes {
	private router: Router;
	private userController = new UserController();

	constructor() {
		this.router = Router();
	}

	getRoutes() {
		this.router.get('/users', this.userController.index.bind(this.userController));
		return this.router;
	}

}

export { UserRoutes };
