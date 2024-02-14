import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';
import IUpdateModuleGradesDTO from '../dtos/IUpdateModuleGradesDTO';

@injectable()
export default class DeleteModuleGradesService {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) { }

  public async execute(id: string, data: IUpdateModuleGradesDTO): Promise<ModuleGrades> {
    const seller = await this.moduleGradesRepository.update(id, data);

    return seller;
  }
}
