import {inject, injectable} from "tsyringe";
import UserRepository from "../repositories/UserRepository";
import {User} from "../core/types";

@injectable()
class UserService {
    constructor(
        @inject('UserRepository') private userRepository: UserRepository
    ) {}

    public async getUsers():Promise<User[]> {
        return this.userRepository.findUsers();
    }

    public async getUserByChatId(chatId: number):Promise<User|undefined> {
        return this.userRepository.findUserByChatId(chatId);
    }

    public async createUser(user: User):Promise<User> {
        console.log(`Creating user ${user.name} with chatId ${user.chatId}`);
        return this.userRepository.createUser(user);
    }
}

export default UserService;