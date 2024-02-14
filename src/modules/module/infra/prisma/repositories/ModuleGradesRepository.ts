import prisma from '@shared/infra/prisma/client';
import { Prisma, ModuleGrades } from '@prisma/client';

import IModuleGradesRepository from '@modules/module/repositories/IModuleGradesRepository';
import ICreateModuleGradesDTO from '@modules/module/dtos/ICreateModuleGradesDTO';
import IUpdateModuleGradesDTO from '@modules/module/dtos/IUpdateModuleGradesDTO';

export default class ModuleGradesRepository implements IModuleGradesRepository {
  private ormRepository: Prisma.ModuleGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.moduleGrades;
  }

  public async findById(id: string): Promise<ModuleGrades | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateModuleGradesDTO): Promise<ModuleGrades> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<ModuleGrades> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllModuleGradesFromASeller(sellerId: string): Promise<ModuleGrades[] | null> {
    const seller = await this.ormRepository.findMany({ where: { sellerId } });

    return seller;
  }

  public async update(id: string, data: IUpdateModuleGradesDTO): Promise<ModuleGrades> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
