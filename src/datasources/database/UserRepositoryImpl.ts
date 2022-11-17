import UserRepository from "../../repositories/UserRepository";
import {User} from "../../core/types";
import database from "../../config/database";

class UserRepositoryImpl implements UserRepository {

    async findUsers(): Promise<User[]> {
        const db = await database.read();
        return db.users as User[]
    }

    async createUser(user: User): Promise<User> {
        const db = await database.read();
        // @ts-ignore
        db.users.push(user);

        await database.write(db);

        return Promise.resolve(user);
    }

    async findUserByChatId(chatId: number): Promise<User | undefined> {
        const db = await database.read();
        const users = db.users;
        return Promise.resolve(
            users.find((user:User) => user.chatId === chatId)
        );
    }
}

export default UserRepositoryImpl;