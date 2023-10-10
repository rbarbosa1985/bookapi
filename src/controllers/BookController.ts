import { NextFunction, Request, Response } from 'express';
import { BookRepository } from '../repositories/BookRepository';

class BookController {
	private bookRepository: BookRepository;
	constructor() {
		this.bookRepository = new BookRepository();
	}
	async index(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, descriptopn, rate } = request.body;
		const { user_id } = request;
		try {

		} catch (error) {
			next(error);
		}
	}
	async store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } = request.body;
		const { user_id } = request;
		try {
			const findBooksByUserId = await this.bookRepository.findByUserId(user_id);
			const filterBook = findBooksByUserId.find((filter) => { return filter.name?.toLowerCase().trim().normalize('NFD') === name.toLowerCase().trim().normalize('NFD'); });
			if (filterBook) {
				throw new Error('Book already exists!');
			}

			const result = await this.bookRepository.createBook({ name, author, company, read, dateRead, description, rate, user_id });
			return response.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}
	async update(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, descriptopn, rate } = request.body;
		const { user_id } = request;
		try {

		} catch (error) {
			next(error);
		}
	}
	async delete(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, descriptopn, rate } = request.body;
		const { user_id } = request;
		try {

		} catch (error) {
			next(error);
		}
	}
}

export { BookController };
