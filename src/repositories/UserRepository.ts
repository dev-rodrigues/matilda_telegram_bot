import {User} from "../core/types/index";

export default interface UserRepository {
    findUserByChatId(chatId: number): Promise<User|undefined>;
    createUser(user: User): Promise<User>;
}