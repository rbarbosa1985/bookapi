import { Book } from '../models';

interface ICreate {
	name: string,
	author: string,
	company: string,
	read: boolean,
	dateRead: Date | null,
	description: string,
	rate: number,
	user_id: string
}

interface IPage {
	size: number,
	page: number
}

class BookRepository {

	async createBook({ name, author, company, read, dateRead, description, rate, user_id }: ICreate) {
		const result = await Book.create({ name, author, company, read, dateRead, description, rate, user_id });
		return result;
	}

	async findByUserId(user_id: string) {
		const result = await Book.find({ user_id });
		return result;
	}

	async findByUserIdPaged(user_id: string, { size, page }: IPage) {
		const result = await Book.find({ user_id }).skip((page - 1) * size).limit(size).exec();
		return result;
	}
}

export { BookRepository };
