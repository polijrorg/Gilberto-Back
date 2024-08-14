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
      console.log(`Supervisor encontrado: ${id}`);
      const modulesInfo = await this.moduleRepository.getModulesInfoSupervisor(id);
      if (!modulesInfo || modulesInfo.length === 0) {
        console.log('Nenhum dado de módulo encontrado para o supervisor');
        return [];
      }
      console.log('Dados de módulo encontrados para o supervisor:', modulesInfo);
      return this.aggregateSellerGrades(modulesInfo);
    }

    // Verificar se o id é de um Gerente
    const manager = await this.managerRepository.findById(id);
    if (manager) {
      console.log(`Gerente encontrado: ${id}`);
      const modulesInfo = await this.moduleRepository.getModulesInfoManager(id);
      if (!modulesInfo || modulesInfo.length === 0) {
        console.log('Nenhum dado de módulo encontrado para o gerente');
        return [];
      }
      console.log('Dados de módulo encontrados para o gerente:', modulesInfo);
      return this.aggregateSellerGrades(modulesInfo);
    }

    // Se não for nem Supervisor nem Gerente, retornar um array vazio
    console.log('ID não corresponde a nenhum Supervisor ou Gerente');
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

    console.log('Dados agregados por vendedor:', sellerData);

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
