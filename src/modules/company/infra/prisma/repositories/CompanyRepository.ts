import prisma from '@shared/infra/prisma/client';
import { Prisma, Company, Director } from '@prisma/client';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '@modules/company/dtos/IUpdateCompanyDTO';

export default class CompanyRepository implements ICompanyRepository {
  private ormRepository: Prisma.CompanyDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.company;
  }

  public async findById(id: string): Promise<(Company & { directors: Director[]}) | null> {
    const seller = await this.ormRepository.findFirst({ where: { id }, include: { director: true } });

    return seller as (Company & { directors: Director[]}) | null;
  }

  public async findByName(name: string | undefined): Promise<Company | null> {
    if (!name) return null;
    const seller = await this.ormRepository.findFirst({ where: { name } });

    return seller;
  }

  public async create({ image = '', name }: ICreateCompanyDTO): Promise<Company> {
    // Criação do novo registro de empresa
    const company = await this.ormRepository.create({
      data: {
        image, // Ordem correta dos campos
        name,
      },
    });

    // Retornar o objeto criado
    return company;
  }

  public async delete(id: string): Promise<Company> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllCompany(): Promise<(Company & { director: Director[]})[] | null> {
    const seller = await this.ormRepository.findMany({ orderBy: { name: 'asc' }, include: { director: true } });

    return seller as (Company & { director: Director[]})[];
  }

  public async update(id: string, data: IUpdateCompanyDTO): Promise<Company> {
    const company = await this.ormRepository.update({ where: { id }, data });

    return company;
  }
}
