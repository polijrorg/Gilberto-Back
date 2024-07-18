/* eslint-disable no-return-await */
import { inject, injectable } from 'tsyringe';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class GetAllModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(): Promise<{
    module: string;
    nameModule: string;
    knowledge: number;
    implementation: number;
}[] | null> {
    return await this.moduleRepository.getModulesInfo();
  }
}
