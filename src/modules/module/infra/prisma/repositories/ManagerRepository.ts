import prisma from '@shared/infra/prisma/client';
import { Prisma, Manager } from '@prisma/client';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ICreateManagerDTO from '@modules/manager/dtos/ICreateManagerDTO';

export default class ManagerRepository implements IManagerRepository {
  private ormRepository: Prisma.ManagerDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.manager;
  }

  public async findById(id: string): Promise<Manager | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
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

  public async getAllManagerByCompany(companyId: string): Promise<Manager[] | null> {
    const seller = await this.ormRepository.findMany({ where: { companyId }, orderBy: { name: 'asc' } });

    return seller;
  }
}
