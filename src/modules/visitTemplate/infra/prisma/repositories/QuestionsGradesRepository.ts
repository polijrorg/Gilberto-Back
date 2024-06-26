import prisma from '@shared/infra/prisma/client';
import { Prisma, QuestionsGrades } from '@prisma/client';

import IQuestionsGradesRepository from '@modules/visitTemplate/repositories/IQuestionsGradesRepository';
import ICreateQuestionsGradesDTO from '@modules/visitTemplate/dtos/ICreateQuestionsGradesDTO';
import IUpdateQuestionsGradesDTO from '@modules/visitTemplate/dtos/IUpdateQuestionsGradesDTO';

export default class QuestionsGradesRepository implements IQuestionsGradesRepository {
  private ormRepository: Prisma.QuestionsGradesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.questionsGrades;
  }

  public async findById(id: string): Promise<QuestionsGrades | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateQuestionsGradesDTO): Promise<QuestionsGrades> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<QuestionsGrades> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllBySeller(sellerId: string): Promise<QuestionsGrades[] | null> {
    const seller = await this.ormRepository.findMany({ where: { sellerId }, orderBy: { created_at: 'asc' } });

    return seller;
  }

  public async update(id: string, data: IUpdateQuestionsGradesDTO): Promise<QuestionsGrades | null> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
