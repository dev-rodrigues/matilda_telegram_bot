import {injectable} from "tsyringe";
import {empty} from "uuidv4";

@injectable()
class ApplicationsDowns {

    private static _instance: ApplicationsDowns;
    private applicationsDowns: Set<String> = new Set<String>();

    constructor() {

    }

    static getInstance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new ApplicationsDowns();
        return this._instance;
    }

    public getApplicationsDowns() {
        return this.applicationsDowns;
    }

    public addApplicationDown(applicationName: string) {
        this.applicationsDowns.add(applicationName);
    }

    public removeApplicationDown(applicationName: string) {
        this.applicationsDowns = new Set<String>(Array.from(this.applicationsDowns).filter(it => it !== applicationName));
    }
}

export default ApplicationsDowns;