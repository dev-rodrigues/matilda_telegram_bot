import { container } from 'tsyringe';

import UserRepository from "../../repositories/UserRepository";
import UserRepositoryImpl from "../../datasources/database/UserRepositoryImpl";

import EurekaRepository from "../../repositories/EurekaRepository";
import EurekaRepositoryImpl from "../../datasources/http/EurekaRepositoryImpl";

container.registerSingleton<UserRepository>('UserRepository', UserRepositoryImpl);
container.registerSingleton<EurekaRepository>('EurekaRepository', EurekaRepositoryImpl);