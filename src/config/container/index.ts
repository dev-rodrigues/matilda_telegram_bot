import { container } from 'tsyringe';

import UserRepository from "../../repositories/UserRepository";
import UserRepositoryImpl from "../../datasources/database/UserRepositoryImpl";

container.registerSingleton<UserRepository>('UserRepository', UserRepositoryImpl);