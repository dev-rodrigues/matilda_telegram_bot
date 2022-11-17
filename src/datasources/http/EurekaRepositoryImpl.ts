import EurekaRepository from "../../repositories/EurekaRepository";
import axios from "axios";

class EurekaRepositoryImpl implements EurekaRepository {

    async findServices(): Promise<Object[]> {
        const endpoint = process.env.EUREKA_ENDPOINT as string
        const result = await axios.get(endpoint);
        return result.data.applications.application
    }
}

export default EurekaRepositoryImpl;