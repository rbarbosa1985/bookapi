import { compare, hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../repositories/UserRepository';

class UserController {
	private userRepository: UserRepository;
	constructor() {
		this.userRepository = new UserRepository();
	}
	async index(request: Request, response: Response, next: NextFunction) {
		try {
			const users = await this.userRepository.findAll();
			return response.json(users);
		} catch (error) {
			next(error);
		}
	}

	async show(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params;
		try {
			const user = await this.userRepository.findById(id);
			return response.json(user);
		} catch (error) {
			next(error);
		}
	}

	async indexPaged(request: Request, response: Response, next: NextFunction) {
		const { page, size } = request.query;
		const DEFAULT_PAGE = 1;
		const DEFAULT_SIZE = 10;

		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE;
		const pageSizeNumber = size ? parseInt(size as string, 10) : DEFAULT_SIZE;

		try {
			const users = await this.userRepository.findAllPaged({ page: pageNumber, size: pageSizeNumber });
			return response.json(users);
		} catch (error) {
			next(error);
		}
	}

	async store(request: Request, response: Response, next: NextFunction) {
		const { name, password, email } = request.body;
		try {
			const findUser = await this.userRepository.findByEmail(email);
			if (findUser) {
				throw new Error('User already exists');
			}
			const hashPassword = await hash(password, 10);
			const createUser = await this.userRepository.createUser({ name, password: hashPassword, email });
			return response.json(createUser);

		} catch (error) {
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params;
		const { name, password, oldPassword } = request.body;
		try {
			const findUser = await this.userRepository.findById(id);
			if (!findUser) {
				throw new Error('User not found');
			}
			if (oldPassword && findUser.password) {
				const passwordMatch = await compare(oldPassword, findUser.password);
				if (!passwordMatch) {
					throw new Error('Password doesn`t match.');
				}
				if (password) {
					const hashPassword = await hash(password, 10);
					await this.userRepository.updatePassword(id, hashPassword);
				}

				if (name) {
					await this.userRepository.updateName(id, name);
				}
			}
			const updateUser = await this.userRepository.findById(id);
			return response.json(updateUser);

		} catch (error) {
			next(error);
		}
	}

}

export { UserController };
