import {inject, injectable} from "tsyringe";
import EurekaRepository from "../repositories/EurekaRepository";

type EurekaResponse = {
    name: string
}

@injectable()
class EurekaService {
    constructor(
        @inject('EurekaRepository') private eurekaRepository: EurekaRepository
    ) {
    }

    private async getServices():Promise<EurekaResponse[]> {
        return await this.eurekaRepository.findServices() as EurekaResponse[];
    }

    public async getServicesOffile():Promise<String[]> {
        const servicesAvailable = ["GATEWAY", "EMAIL-SERVICE", "API--COPPETEC", "COPPETEC--DOCUMENTO"]
        const result = await this.getServices();

        return servicesAvailable.filter(
            val => !result.find(it => it.name === val)
        ).map(it => it.toUpperCase())
    }

    public async getServicesOnline():Promise<String[]> {
        const result = await this.getServices();
        return result.map(it => it.name);
    }
}

export default EurekaService;