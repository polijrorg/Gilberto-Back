import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';
import ICreateModuleGradesDTO from '../dtos/ICreateModuleGradesDTO';

@injectable()
export default class CreateModuleGradesService {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) { }

  public async execute(data: ICreateModuleGradesDTO): Promise<ModuleGrades> {
    const seller = await this.moduleGradesRepository.create(data);

    return seller;
  }
}
