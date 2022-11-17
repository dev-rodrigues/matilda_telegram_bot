import {container, injectable} from "tsyringe";

import EurekaService from "../../services/EurekaService";
import UserService from "../../services/UserService";
import ApplicationsDowns from "../../core/singletons/ApplicationsDowns";
import {CronJob} from "cron";
import bot from "../../config/bot";


@injectable()
class CheckServicesTurnUp {

    cronJob: CronJob;
    singleton = ApplicationsDowns.getInstance();

    constructor() {

        const eurekaService = container.resolve(EurekaService);
        const usersService = container.resolve(UserService);

        this.cronJob = new CronJob('* * * * *', async () => {
            const applicationsOnline = await eurekaService.getServicesOnline();
            const applicationsOffline = this.singleton.getApplicationsDowns();
            const users = await  usersService.getUsers();

            for (const app of applicationsOffline) {
                if (applicationsOnline.includes(app)) {
                    this.singleton.removeApplicationDown(app.toUpperCase());
                    for(const it of users) {
                        await bot.sendMessage(it.chatId, `Service ${app.toUpperCase()} is UP ✅`)
                    }
                }
            }
        });

        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }
}

export default CheckServicesTurnUp;