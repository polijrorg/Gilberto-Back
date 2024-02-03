import prisma from '@shared/infra/prisma/client';
import { Prisma, Company } from '@prisma/client';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '@modules/company/dtos/IUpdateCompanyDTO';

export default class CompanyRepository implements ICompanyRepository {
  private ormRepository: Prisma.CompanyDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.company;
  }

  public async findById(id: string): Promise<Company | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async findByName(name: string | undefined): Promise<Company | null> {
    if (!name) return null;
    const seller = await this.ormRepository.findFirst({ where: { name } });

    return seller;
  }

  public async create(data: ICreateCompanyDTO): Promise<Company> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Company> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllCompany(): Promise<Company[] | null> {
    const seller = await this.ormRepository.findMany({ orderBy: { name: 'asc' } });

    return seller;
  }

  public async update(id: string, data: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.ormRepository.update({ where: { id }, data });

    return company;
  }
}
