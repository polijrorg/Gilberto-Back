import prisma from '@shared/infra/prisma/client';
import { Prisma, Module, ModuleGrades } from '@prisma/client';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ICreateModuleDTO from '@modules/module/dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '@modules/module/dtos/IUpdateModule';

export default class ModuleRepository implements IModuleRepository {
  private ormRepository: Prisma.ModuleDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  private moduleGradeRepository: Prisma.ModuleGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.module;
    this.moduleGradeRepository = prisma.moduleGrades;
  }

  public async getModulesInfo(): Promise<{ module: string; nameModule: string; knowledge: number; implementation: number; }[]> {
    const modules = await this.ormRepository.findMany({
      include: {
        sellerGrades: true, // Inclui os dados da relação com ModuleGrades
      },
    });

    // Mapeia os dados dos módulos para o formato desejado
    const modulesInfo = modules.map((module: Module & { sellerGrades: ModuleGrades[] }) => ({
      module: module.id,
      nameModule: module.name,
      knowledge: this.calculateAverageKnowledge(module.sellerGrades),
      implementation: this.calculateAverageImplementation(module.sellerGrades),
    }));

    return modulesInfo;
  }

  private calculateAverageKnowledge(grades: ModuleGrades[]): number {
    if (!grades || grades.length === 0) return 0;

    const totalKnowledge = grades.reduce((sum, grade) => sum + grade.knowledgeScore, 0);
    return totalKnowledge / grades.length;
  }

  private calculateAverageImplementation(grades: ModuleGrades[]): number {
    if (!grades || grades.length === 0) return 0;

    const totalImplementation = grades.reduce((sum, grade) => sum + grade.implementationScore, 0);
    return totalImplementation / grades.length;
  }

  public async findByName(name: string): Promise<Module | null> {
    const seller = await this.ormRepository.findFirst({ where: { name } });

    return seller;
  }

  public async findById(id: string): Promise<Module | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateModuleDTO): Promise<Module> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Module> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllModules(): Promise<Module[] | null> {
    const seller = await this.ormRepository.findMany();

    return seller;
  }

  public async update(id: string, data: IUpdateModuleDTO): Promise<Module> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
