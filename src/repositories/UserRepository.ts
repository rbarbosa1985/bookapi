import { User } from '../models';

interface ICreate {
	name: string,
	password: string,
	email: string
}

interface IPage {
	size: number,
	page: number
}

class UserRepository {

	async findAll() {
		const result = await User.find();
		return result;
	}

	async findAllPaged({ page, size }: IPage) {
		const result = await User.find().skip((page - 1) * size).limit(size).exec();
		return result;
	}

	async findById(id: string) {
		const result = await User.findById(id);
		return result;
	}

	async findByEmail(email: string) {
		const result = await User.findOne({ email });
		return result;
	}

	async createUser({ name, password, email }: ICreate) {
		const result = await User.create({ name, password, email });
		return result;
	}

	async updatePassword(id: string, password: string) {
		const result = await User.findById(id).updateOne({ password });
		return result;
	}

	async updateName(id: string, name: string) {
		const result = await User.findById(id).updateOne({ name });
		return result;
	}

	async delete(id: string) {
		const result = await User.findById(id).deleteOne();
		return result;
	}
}

export { UserRepository };
