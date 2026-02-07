import { EnvironmentModel } from '../models/environment.model';

export const EnvConfigConstant: EnvironmentModel = process.env as unknown as EnvironmentModel;
