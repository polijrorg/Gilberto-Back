import { inject, injectable } from 'tsyringe';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import AppError from '@shared/errors/AppError';
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
    let modulesInfo: IResponseModuleGradeDTO[] | null = null;

    // Verificar se o ID é de um Supervisor
    const supervisor = await this.supervisorRepository.findById(id);
    if (supervisor) {
      modulesInfo = await this.moduleRepository.getModulesInfoSupervisor(id);
    } else {
      // Verificar se o ID é de um Gerente
      const manager = await this.managerRepository.findById(id);
      if (manager) {
        modulesInfo = await this.moduleRepository.getModulesInfoManager(id);
      } else {
        throw new AppError('Supervisor or Manager not found', 400);
      }
    }

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
      const sellerId = module.module; // Ajuste para usar o ID do vendedor como chave
      if (!sellerData[sellerId]) {
        sellerData[sellerId] = { knowledgeSum: 0, implementationSum: 0, count: 0 };
      }
      sellerData[sellerId].knowledgeSum += module.knowledge;
      sellerData[sellerId].implementationSum += module.implementation;
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
