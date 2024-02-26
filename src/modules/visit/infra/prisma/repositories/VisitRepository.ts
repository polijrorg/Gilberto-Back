import prisma from '@shared/infra/prisma/client';
import { Prisma, Visit } from '@prisma/client';

import IVisitRepository from '@modules/visit/repositories/IVisitRepository';
import ICreateVisitDTO from '@modules/visit/dtos/ICreateVisitDTO';

export default class VisitRepository implements IVisitRepository {
  private ormRepository: Prisma.VisitDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.visit;
  }

  public async findById(id: string): Promise<Visit | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateVisitDTO): Promise<Visit> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Visit> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllBySeller(sellerId: string): Promise<Visit[] | null> {
    const seller = await this.ormRepository.findMany({ where: { sellerId }, orderBy: { dateVisited: 'asc' } });

    return seller;
  }
}
