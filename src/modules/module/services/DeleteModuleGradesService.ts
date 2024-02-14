import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';

@injectable()
export default class DeleteModuleGradesService {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) { }

  public async execute(id: string): Promise<ModuleGrades> {
    const idExists = await this.moduleGradesRepository.findById(id);

    if (!idExists) throw new AppError('This id does not exist');

    const seller = await this.moduleGradesRepository.delete(id);

    return seller;
  }
}
