import axios from "axios";
import axiosRetry from "axios-retry";

import EurekaRepository from "../../repositories/EurekaRepository";

axiosRetry(axios, {
    retries: 999,
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`)
        return retryCount;
    },
    retryCondition: (err) => {
        return err.response?.status != 200;
    }
})

class EurekaRepositoryImpl implements EurekaRepository {

    endpoint = process.env.EUREKA_ENDPOINT as string

    async findServices(): Promise<Object[]> {
        const result = await axios.get(this.endpoint).catch((err) => {
            if (err.response.status != 200) {
                throw new Error(`API call failed with status code: ${err.response.status} after 3 retry attempts`);
            }
        })

        return result?.data.applications.application
    }
}

export default EurekaRepositoryImpl;