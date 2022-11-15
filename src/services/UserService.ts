import {inject, injectable} from "tsyringe";
import UserRepository from "../repositories/UserRepository";
import {User} from "../core/types";

@injectable()
class UserService {
    constructor(
        @inject('UserRepository') private userRepository: UserRepository
    ) {}

    public async getUserByChatId(chatId: number):Promise<User|undefined> {
        return this.userRepository.findUserByChatId(chatId);
    }

    public async createUser(user: User):Promise<User> {
        return this.userRepository.createUser(user);
    }
}

export default UserService;