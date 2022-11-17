import TelegramBot from "node-telegram-bot-api";
import {container} from "tsyringe";

import bot from "../../config/bot";
import UserService from "../../services/UserService";

class EventListener {

    public static async listen():Promise<void> {
        bot.onText(/\/start/, async (msg: TelegramBot.Message) => {

            const chatId = msg.chat.id;
            const firstName = msg?.from?.first_name;
            const service = container.resolve(UserService);

            if (!await service.getUserByChatId(chatId)) {
                await service.createUser({
                    chatId,
                    name: firstName??'',
                });

                await bot.sendMessage(chatId, `Welcome ${firstName}`);
                await bot.sendMessage(chatId, `Chat successfully registered. You will be notified whenever there is an instability in any of the applications.`);

            } else {


                await bot.sendMessage(chatId, `You are already registered. You will be notified whenever there is an instability in any of the applications.`);
            }

            return true;
        });
    }
}

export default EventListener;