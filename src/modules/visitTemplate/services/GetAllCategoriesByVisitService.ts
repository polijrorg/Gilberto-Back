import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class GetAllCategoriesByVisitService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(visitTemplateId: string): Promise<Categories[] | null> {
    const sellerExists = await this.visitTemplateRepository.findById(visitTemplateId);

    if (!sellerExists) throw new AppError('A visit template with this Id does not exist');

    const seller = await this.categoriesRepository.getAllByVisit(visitTemplateId);

    return seller;
  }
}
