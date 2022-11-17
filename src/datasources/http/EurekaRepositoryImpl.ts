import EurekaRepository from "../../repositories/EurekaRepository";
import axios from "axios";

class EurekaRepositoryImpl implements EurekaRepository {

    async findServices(): Promise<Object[]> {
        const result = await axios.get("http://146.164.65.231:8761/eureka/apps");
        return result.data.applications.application
    }
}

export default EurekaRepositoryImpl;