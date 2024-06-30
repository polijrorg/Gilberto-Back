// src/modules/module/services/CalculateModuleAveragesService.ts

import { inject, injectable } from 'tsyringe';

import IModuleGradesRepository from '../repositories/IModuleGradesRepository';

interface IModuleAverage {
  moduleId: string;
  average: number;
}

@injectable()
export default class CalculateModuleAveragesService {
  constructor(
    @inject('ModuleGradesRepository')
    private moduleGradesRepository: IModuleGradesRepository,
  ) {}

  public async execute(): Promise<{ moduleId: string; average: number }[]> {
    const modules = await this.moduleGradesRepository.getAllModuleGradesAll();

    if (!modules || modules.length === 0) {
      return [];
    }

    const moduleAverages: IModuleAverage[] = modules.map((module: { moduleId: string; implementationScore: number; knowledgeScore: number; }) => ({
      moduleId: module.moduleId,
      average: (module.implementationScore + module.knowledgeScore) / 2,
    }));

    return moduleAverages;
  }
}
