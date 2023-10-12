import { NextFunction, Request, Response } from 'express';
import { BookRepository } from '../repositories/BookRepository';

class BookController {
	private bookRepository: BookRepository;
	constructor() {
		this.bookRepository = new BookRepository();
	}
	async index(request: Request, response: Response, next: NextFunction) {
		const { user_id } = request;
		const { page, size } = request.query;
		const DEFAULT_PAGE = 1;
		const DEFAULT_SIZE = 10;

		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE;
		const pageSizeNumber = size ? parseInt(size as string, 10) : DEFAULT_SIZE;

		try {
			const findBooksByUserIdPaged = await this.bookRepository.findByUserIdPaged(user_id, { page: pageNumber, size: pageSizeNumber });
			return response.json(findBooksByUserIdPaged);
		} catch (error) {
			next(error);
		}
	}

	async store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } = request.body;
		const { user_id } = request;
		const readVerify = read ? true : false;
		const dateReadVerify = dateRead ? new Date(dateRead) : null;

		try {
			const findBooksByUserId = await this.bookRepository.findByUserId(user_id);
			const filterBook = findBooksByUserId.find((filter) => { return filter.name?.toLowerCase().trim().normalize('NFD') === name.toLowerCase().trim().normalize('NFD'); });
			if (filterBook) {
				throw new Error('Book already exists!');
			}
			if (!readVerify && rate) {
				throw new Error('You can grade only books that have been read!');
			}
			const result = await this.bookRepository.createBook({ name, author, company, read: readVerify, dateRead: dateReadVerify, description, rate, user_id });
			return response.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	// async update(request: Request, response: Response, next: NextFunction) {
	// 	const { name, author, company, read, dateRead, descriptopn, rate } = request.body;
	// 	const { user_id } = request;
	// 	try {

	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
	// async delete(request: Request, response: Response, next: NextFunction) {
	// 	const { name, author, company, read, dateRead, descriptopn, rate } = request.body;
	// 	const { user_id } = request;
	// 	try {

	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
}

export { BookController };
