import prisma from "@shared/infra/prisma/client";
import { Prisma, Visit } from "@prisma/client";

import IVisitRepository from "@modules/visit/repositories/IVisitRepository";
import ICreateVisitDTO from "@modules/visit/dtos/ICreateVisitDTO";
import IUpdateVisitDTO from "@modules/visit/dtos/IUpdateVisitDTO";

export default class VisitRepository implements IVisitRepository {
  private ormRepository: Prisma.VisitDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor() {
    this.ormRepository = prisma.visit;
  }
  public async getAll(): Promise<Visit[] | null> {
    const visits = await this.ormRepository.findMany();
    return visits;
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
    const seller = await this.ormRepository.findMany({
      where: { sellerId },
      orderBy: { dateVisited: "asc" },
    });

    return seller;
  }

  public async update(id: string, data: IUpdateVisitDTO): Promise<Visit> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
