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

interface IUpdate {
	id: string,
	read: boolean,
	dateRead: Date,
	rate: number,
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

	async findById(id: string, user_id: string) {
		const result = await Book.find({ _id: id, user_id });
		return result;
	}

	async delete(id: string) {
		const result = await Book.findByIdAndRemove(id);
		return result;
	}

	async update({ id, rate, read, dateRead }: IUpdate) {
		const result = await Book.findById(id).updateOne({
			dateRead,
			rate,
			read
		});
		return result;
	}
}

export { BookRepository };
