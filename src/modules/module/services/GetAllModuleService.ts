import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class GetAllModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(): Promise<Module[] | null> {
    const seller = await this.moduleRepository.getAllModules();

    return seller;
  }
}
