import TelegramBot from "node-telegram-bot-api";

import bot from "../../configs/bot";
import database from "../../configs/database";

type User = {
    chatId: number;
    name: string;
}

bot.on("message", async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const firstName = msg?.from?.first_name;


    const db = await database.read();
    const users = db.users;

    const localizedChat = users.find((user:User) => user.chatId === chatId);

    if (!localizedChat) {
        db.users.push({
            // @ts-ignore
            chatId,
            // @ts-ignore
            firstName,
        });
        await database.write(db);

        await bot.sendMessage(chatId, `Welcome ${firstName}`);
        await bot.sendMessage(chatId, `Chat successfully registered. You will be notified whenever there is an instability in any of the applications.`);
    }

    return true;
})