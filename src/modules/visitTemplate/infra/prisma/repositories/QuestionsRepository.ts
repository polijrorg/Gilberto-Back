import prisma from '@shared/infra/prisma/client';
import { Prisma, Questions } from '@prisma/client';

import IQuestionsRepository from '@modules/visitTemplate/repositories/IQuestionsRepository';
import ICreateQuestionsDTO from '@modules/visitTemplate/dtos/ICreateQuestionsDTO';
import IUpdateQuestionsDTO from '@modules/visitTemplate/dtos/IUpdateQuestionsDTO';

export default class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Prisma.QuestionsDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.questions;
  }

  public async update(id: string, question: IUpdateQuestionsDTO): Promise<Questions> {
    return this.ormRepository.update({
      where: { id },
      data: question,
    });
  }

  public async findById(id: string): Promise<Questions | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateQuestionsDTO): Promise<Questions> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Questions> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllByCategories(categoriesId: string): Promise<Questions[] | null> {
    const seller = await this.ormRepository.findMany({ where: { categoriesId } });

    return seller;
  }
}
