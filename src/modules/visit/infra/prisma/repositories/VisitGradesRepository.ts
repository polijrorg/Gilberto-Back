import prisma from '@shared/infra/prisma/client';
import { Prisma, VisitGrades } from '@prisma/client';

import IVisitGradesRepository from '@modules/visit/repositories/IVisitGradesRepository';
import ICreateVisitGradesDTO from '@modules/visit/dtos/ICreateVisitGradesDTO';
import IUpdateVisitGradesDTO from '@modules/visit/dtos/IUpdateVisitGradesDTO';

export default class VisitGradesRepository implements IVisitGradesRepository {
  private ormRepository: Prisma.VisitGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.visitGrades;
  }

  public async findById(id: string): Promise<VisitGrades | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateVisitGradesDTO): Promise<VisitGrades> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<VisitGrades> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllBySeller(sellerId: string): Promise<VisitGrades[] | null> {
    const seller = await this.ormRepository.findMany({ where: { sellerId }, orderBy: { grade: 'asc' } });

    return seller;
  }

  public async update(id: string, data: IUpdateVisitGradesDTO): Promise<VisitGrades> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
