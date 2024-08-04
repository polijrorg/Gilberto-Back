import prisma from '@shared/infra/prisma/client';
import {
  Prisma, Manager, Company, Director,
} from '@prisma/client';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ICreateManagerDTO from '@modules/manager/dtos/ICreateManagerDTO';
import IUpdateManagerDTO from '@modules/manager/dtos/IUpdateManagerDTO';

export default class ManagerRepository implements IManagerRepository {
  private ormRepository: Prisma.ManagerDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.manager;
  }

  public async findAll(): Promise<Manager[]> {
    const seller = await this.ormRepository.findMany();

    return seller;
  }

  public async findById(id: string): Promise<(Manager & { company: Company, director: Director}) | null> {
    const seller = await this.ormRepository.findFirst({
      where: { id },
      include: {
        company: true,
        director: true,
      },
    });

    return seller as (Manager & { company: Company, director: Director}) | null;
  }

  public async findByEmail(email: string): Promise<Manager | null> {
    const seller = await this.ormRepository.findFirst({ where: { email } });

    return seller;
  }

  public async create(data: ICreateManagerDTO): Promise<Manager> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Manager> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllManagerByCompany(companyId: string): Promise<(Manager & { director: { name: string } | null })[] | null> {
    const seller = await this.ormRepository.findMany({
      where: { companyId },
      include: { director: { select: { name: true } } },
      orderBy: { name: 'asc' },
    });

    return seller;
  }

  public async getAllManagerByDirector(directorId: string): Promise<Manager[] | null> {
    const seller = await this.ormRepository.findMany({ where: { directorId }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async update(id: string, data: IUpdateManagerDTO): Promise<Manager> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
