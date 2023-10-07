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

	async findByEmail(email: string) {
		const result = await User.findOne({ email });
		return result;
	}

	async createUser({ name, password, email }: ICreate) {
		const result = await User.create({ name, password, email });
		return result;
	}
}

export { UserRepository };
