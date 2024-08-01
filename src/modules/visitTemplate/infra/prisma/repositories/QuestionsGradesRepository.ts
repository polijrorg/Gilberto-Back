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

  public async getAllByIDSeller(idSeller: string): Promise<QuestionsGrades[] | null> {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Criação do início e do fim do dia atual
    const startOfDay = new Date(currentYear, currentMonth, currentDay);
    const endOfDay = new Date(currentYear, currentMonth, currentDay + 1);

    const grades = await this.ormRepository.findMany({
      where: {
        sellerId: idSeller,
        created_at: {
          gte: startOfDay, // Início do dia
          lt: endOfDay, // Início do próximo dia
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    return grades || [];
  }

  public async getAllByIDManager(idManager: string): Promise<(QuestionsGrades)[] | null> {
    const grades = await this.ormRepository.findMany({
      where: {
        seller: {
          supervisor: {
            managerId: idManager,
          },
        },
      },
    });

    return grades;
  }

  public async getAllByIDSupervisor(idSupervisor: string): Promise<(QuestionsGrades)[] | null> {
    const grades = await this.ormRepository.findMany({
      where: {
        seller: {
          supervisorId: idSupervisor,
        },
      },
    });

    return grades;
  }

  public async findById(id: string): Promise<QuestionsGrades | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create({
    visitId, grade, questionsId, sellerId,
  }: ICreateQuestionsGradesDTO): Promise<QuestionsGrades> {
    const seller = await this.ormRepository.create({
      data: {
        grade, questionsId, sellerId, visitId,
      },
    });

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
