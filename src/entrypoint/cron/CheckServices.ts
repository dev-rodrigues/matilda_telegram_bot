import {container, injectable} from "tsyringe";
import {CronJob} from "cron";

import EurekaService from "../../services/EurekaService";
import UserService from "../../services/UserService";
import bot from "../../config/bot";

@injectable()
class CheckServices {

    cronJob: CronJob;

    constructor() {

        const eurekaService = container.resolve(EurekaService);
        const usersService = container.resolve(UserService);

        this.cronJob = new CronJob('* * * * *', async () => {
            const applicationsOffline = await eurekaService.getServicesOffile();
            const users = await  usersService.getUsers();

            for(const it of users) {
                for (const app of applicationsOffline) {
                    console.error(`APPLICATIONS OFFLINE ${app.toUpperCase()}`)
                    await bot.sendMessage(it.chatId, `Service ${app.toUpperCase()} is DOWN ❌`)
                }
            }
        });

        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }
}

export default CheckServices;