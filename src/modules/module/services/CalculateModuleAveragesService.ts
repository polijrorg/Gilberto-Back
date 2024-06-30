// src/modules/module/services/CalculateModuleAveragesService.ts

import { inject, injectable } from 'tsyringe';

import { ModuleGrades } from '@prisma/client';
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

  public async execute(): Promise<IModuleAverage[]> {
    const modules = await this.moduleGradesRepository.getAllModuleGradesAll();

    if (!modules || modules.length === 0) {
      return [];
    }

    // Verifica e agrupa módulos por moduleId, assegurando que não há IDs repetidos
    const uniqueModulesMap = new Map<string, ModuleGrades>();
    modules.forEach((module) => {
      uniqueModulesMap.set(module.moduleId, module);
    });

    // Converte para array novamente, agora sem IDs repetidos
    const uniqueModules = Array.from(uniqueModulesMap.values());

    // Calcula as médias dos módulos e retorna junto com o nome do módulo
    const moduleAverages: IModuleAverage[] = uniqueModules.map((module) => ({
      moduleId: module.moduleId,
      average: (module.implementationScore + module.knowledgeScore) / 2,
    }));

    return moduleAverages;
  }
}
