import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitRepository from '../repositories/IVisitRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

@injectable()
export default class CreateCategoriesService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(data: ICreateCategoriesDTO): Promise<Categories> {
    const sellerExists = await this.visitRepository.findById(data.visitId);

    if (!sellerExists) throw new AppError('A visit with this Id does not exist');

    const seller = await this.categoriesRepository.create(data);

    return seller;
  }
}
