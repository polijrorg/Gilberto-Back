import { inject, injectable } from 'tsyringe';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IModuleRepository from '../repositories/IModuleRepository';
import IResponseModuleGradeDTO from '../dtos/IResponseModuleGradeDTO';

@injectable()
export default class GetAllModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) {}

  public async execute(id: string): Promise<{
    sellerId: string;
    averageKnowledge: number;
    averageImplementation: number;
  }[]> {
    // Verificar se o id é de um Supervisor
    // Verificar se o id é de um Supervisor
    const supervisor = await this.supervisorRepository.findById(id);
    if (supervisor) {
      const modulesInfo = await this.moduleRepository.getModulesInfoSupervisor(id);
      if (!modulesInfo || modulesInfo.length === 0) {
        return [];
      }
      return this.aggregateSellerGrades(modulesInfo);
    }

    // Verificar se o id é de um Gerente
    const manager = await this.managerRepository.findById(id);
    if (manager) {
      const modulesInfo = await this.moduleRepository.getModulesInfoManager(id);
      if (!modulesInfo || modulesInfo.length === 0) {
        return [];
      }
      return this.aggregateSellerGrades(modulesInfo);
    }

    // Se não for nem Supervisor nem Gerente, retornar um array vazio
    return [];
  }

  private aggregateSellerGrades(modulesInfo: IResponseModuleGradeDTO[]): {
    sellerId: string;
    averageKnowledge: number;
    averageImplementation: number;
  }[] {
    const sellerData: Record<string, { knowledgeSum: number; implementationSum: number; count: number }> = {};

    modulesInfo.forEach((module) => {
      const { module: sellerId, knowledge, implementation } = module;
      if (!sellerData[sellerId]) {
        sellerData[sellerId] = { knowledgeSum: 0, implementationSum: 0, count: 0 };
      }
      sellerData[sellerId].knowledgeSum += knowledge;
      sellerData[sellerId].implementationSum += implementation;
      sellerData[sellerId].count += 1;
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
