import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';

@injectable()
export default class DeleteModuleGradesService {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) { }

  public async execute(sellerId: string): Promise<ModuleGrades[] | null> {
    const seller = await this.moduleGradesRepository.getAllModuleGradesFromASeller(sellerId);

    return seller;
  }
}
