import { Book } from '../models';

interface ICreate {
	name: string,
	author: string,
	company: string,
	read: boolean,
	dateRead: Date,
	description: string,
	rate: number,
	user_id: string
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

}

export { BookRepository };
