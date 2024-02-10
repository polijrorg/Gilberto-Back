import prisma from '@shared/infra/prisma/client';
import { Prisma, Module } from '@prisma/client';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ICreateModuleDTO from '@modules/module/dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '@modules/module/dtos/IUpdateModule';

export default class ModuleRepository implements IModuleRepository {
  private ormRepository: Prisma.ModuleDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.module;
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
