import prisma from '@shared/infra/prisma/client';
import { Prisma, Module, ModuleGrades } from '@prisma/client';
import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ICreateModuleDTO from '@modules/module/dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '@modules/module/dtos/IUpdateModule';
import IResponseModuleGradeDTO from '@modules/module/dtos/IResponseModuleGradeDTO';

export default class ModuleRepository implements IModuleRepository {
  private ormRepository: Prisma.ModuleDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  private moduleGradeRepository: Prisma.ModuleGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

  constructor() {
    this.ormRepository = prisma.module;
    this.moduleGradeRepository = prisma.moduleGrades;
  }

  public async getModulesInfoManager(managerId: string): Promise<IResponseModuleGradeDTO[] | null> {
    const modules = await this.ormRepository.findMany({
      include: {
        sellerGrades: {
          where: {
            seller: {
              stage: {
                equals: 'Mentoria',
              },
              supervisor: {
                managerId,
              },
            },
          },
        },
      },
    });

    return this.aggregateModuleInfo(modules);
  }

  public async getModulesInfoSupervisor(supervisorId: string): Promise<IResponseModuleGradeDTO[] | null> {
    const modules = await this.ormRepository.findMany({
      where: {
        sellerGrades: {
          some: {
            seller: {
              supervisorId,
              stage: {
                equals: 'Mentoria',
              },
            },
          },
        },
      },
      include: {
        sellerGrades: {
          where: {
            seller: {
              supervisor: {
                id: supervisorId,
              },
            },
          },
        },
      },
    });

    return this.aggregateModuleInfo(modules);
  }

  private aggregateModuleInfo(modules: (Module & { sellerGrades: ModuleGrades[] })[]): IResponseModuleGradeDTO[] {
    const sellerData: Record<string, { knowledgeSum: number; implementationSum: number; count: number }> = {};

    modules.forEach((module) => {
      module.sellerGrades.forEach((grade) => {
        const { sellerId } = grade;
        if (!sellerData[sellerId]) {
          sellerData[sellerId] = { knowledgeSum: 0, implementationSum: 0, count: 0 };
        }
        sellerData[sellerId].knowledgeSum += grade.knowledgeScore;
        sellerData[sellerId].implementationSum += grade.implementationScore;
        sellerData[sellerId].count += 1;
      });
    });

    return Object.keys(sellerData).map((sellerId) => {
      const { knowledgeSum, implementationSum, count } = sellerData[sellerId];
      return {
        module: sellerId,
        nameModule: 'N/A', // Pode ser ajustado para fornecer um nome de módulo adequado se necessário
        knowledge: knowledgeSum / count,
        implementation: implementationSum / count,
      };
    });
  }

  public async findByName(name: string): Promise<Module | null> {
    return this.ormRepository.findFirst({ where: { name } });
  }

  public async findById(id: string): Promise<Module | null> {
    return this.ormRepository.findFirst({ where: { id } });
  }

  public async create(data: ICreateModuleDTO): Promise<Module> {
    return this.ormRepository.create({ data });
  }

  public async delete(id: string): Promise<Module> {
    return this.ormRepository.delete({ where: { id } });
  }

  public async getAllModules(): Promise<Module[] | null> {
    return this.ormRepository.findMany();
  }

  public async update(id: string, data: IUpdateModuleDTO): Promise<Module> {
    return this.ormRepository.update({ where: { id }, data });
  }
}
