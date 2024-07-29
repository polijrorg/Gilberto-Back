import { inject, injectable } from 'tsyringe';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import IModuleRepository from '../repositories/IModuleRepository';
import IResponseModuleGradeDTO from '../dtos/IResponseModuleGradeDTO';

@injectable()
export default class GetAllModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) {}

  public async execute(supervisorId: string): Promise<{
    sellerId: string;
    averageKnowledge: number;
    averageImplementation: number;
  }[]> {
    const modulesInfo = supervisorId
      ? await this.moduleRepository.getModulesInfoSupervisor(supervisorId)
      : await this.moduleRepository.getModulesInfoAll();

    if (!modulesInfo) return [];

    return this.aggregateSellerGrades(modulesInfo);
  }

  private aggregateSellerGrades(modulesInfo: IResponseModuleGradeDTO[]): {
    sellerId: string;
    averageKnowledge: number;
    averageImplementation: number;
  }[] {
    const sellerData: Record<string, { knowledgeSum: number; implementationSum: number; count: number }> = {};

    modulesInfo.forEach((module) => {
      if (!sellerData[module.module]) {
        sellerData[module.module] = { knowledgeSum: 0, implementationSum: 0, count: 0 };
      }
      sellerData[module.module].knowledgeSum += module.knowledge;
      sellerData[module.module].implementationSum += module.implementation;
      sellerData[module.module].count += 1;
    });

    return Object.keys(sellerData).map((sellerId) => {
      const { knowledgeSum, implementationSum, count } = sellerData[sellerId];
      return {
        sellerId,
        averageKnowledge: knowledgeSum / count,
        averageImplementation: implementationSum / count,
      };
    });
  }
}
