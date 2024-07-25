import prisma from '@shared/infra/prisma/client';
import { Prisma, Categories } from '@prisma/client';

import ICategoriesRepository from '@modules/visitTemplate/repositories/ICategoriesRepository';
import ICreateCategoriesDTO from '@modules/visitTemplate/dtos/ICreateCategoriesDTO';
import IUpdateCategoriesDTO from '@modules/visitTemplate/dtos/IUpdateCategoriesDTO';

export default class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Prisma.CategoriesDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.categories;
  }

  public async update(id: string, data: IUpdateCategoriesDTO): Promise<Categories> {
    return this.ormRepository.update({
      where: { id },
      data,
    });
  }

  public async findById(id: string): Promise<Categories | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateCategoriesDTO): Promise<Categories> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Categories> {
    await prisma.questionsGrades.deleteMany({
      where: {
        question: {
          categoriesId: id,
        },
      },
    });
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllByVisit(visitTemplateId: string): Promise<Categories[] | null> {
    const visit = await this.ormRepository.findMany({
      where: { visitTemplateId },
    });

    return visit;
  }
}
