import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

@injectable()
export default class CreateCategoriesService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(data: ICreateCategoriesDTO): Promise<Categories> {
    const sellerExists = await this.visitTemplateRepository.findById(data.visitTemplateId);

    if (!sellerExists) throw new AppError('A visit template with this Id does not exist');

    const seller = await this.categoriesRepository.create(data);

    return seller;
  }
}
