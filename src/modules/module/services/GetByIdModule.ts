import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class GetByIdModule {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(moduleId: string): Promise<Module> {
    const seller = await this.moduleRepository.findById(moduleId);

    if (!seller) {
      throw new Error('Module not found');
    }

    return seller;
  }
}
