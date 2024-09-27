import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';

@injectable()
export default class GetByIdModule {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) { }

  public async execute(moduleId: string): Promise<ModuleGrades> {
    const seller = await this.moduleGradesRepository.findById(moduleId);

    if (!seller) {
      throw new Error('ModuleGrades not found');
    }

    return seller;
  }
}
