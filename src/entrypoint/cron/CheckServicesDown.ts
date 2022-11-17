import {container, injectable} from "tsyringe";
import {CronJob} from "cron";

import EurekaService from "../../services/EurekaService";
import UserService from "../../services/UserService";
import bot from "../../config/bot";
import ApplicationsDowns from "../../core/singletons/ApplicationsDowns";

@injectable()
class CheckServicesDown {

    cronJob: CronJob;
    private singleton:ApplicationsDowns = ApplicationsDowns.getInstance();

    constructor() {

        const eurekaService = container.resolve(EurekaService);
        const usersService = container.resolve(UserService);


        this.cronJob = new CronJob('* * * * *', async () => {
            const applicationsOffline = await eurekaService.getServicesOffile();
            const users = await  usersService.getUsers();

            for(const it of users) {
                for (const app of applicationsOffline) {
                    console.error(`APPLICATIONS OFFLINE ${app.toUpperCase()}`)
                    this.singleton.addApplicationDown(app.toUpperCase());
                    await bot.sendMessage(it.chatId, `Service ${app.toUpperCase()} is DOWN ❌`)
                }
            }
        });

        if (!this.cronJob.running) {
            this.cronJob.start();
        }
    }
}

export default CheckServicesDown;