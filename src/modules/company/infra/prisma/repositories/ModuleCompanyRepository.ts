import prisma from '@shared/infra/prisma/client';
import {
  Prisma, ModuleCompany, Company, Module,
} from '@prisma/client';

import IModuleCompanyRepository from '@modules/company/repositories/IModuleCompanyRepository';
import ICreateModuleCompanyDTO from '@modules/company/dtos/ICreateModuleCompanyDTO';

export default class ModuleCompanyRepository implements IModuleCompanyRepository {
  private ormRepository: Prisma.ModuleCompanyDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.moduleCompany;
  }

  public async findById(id: string): Promise<ModuleCompany | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateModuleCompanyDTO): Promise<ModuleCompany> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<ModuleCompany> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllModuleCompany(): Promise<ModuleCompany[] | null> {
    const seller = await this.ormRepository.findMany();

    return seller;
  }

  public async getAllCompaniesWithAModule(moduleId: string): Promise<Company[] | null> {
    const seller = await this.ormRepository.findMany({ where: { moduleId }, include: { company: true } }).then((relacoes) => relacoes.map((relation) => relation.company));

    const orderedCompanies = seller.sort((a, b) => a.name.localeCompare(b.name));

    return orderedCompanies;
  }

  public async getAllModulesFromACompany(companyId: string): Promise<Module[] | null> {
    const modules = await this.ormRepository.findMany({ where: { companyId }, include: { module: true } }).then((relacoes) => relacoes.map((relation) => relation.module));

    const orderedModules = modules.sort((a, b) => a.name.localeCompare(b.name));

    return orderedModules;
  }
}
