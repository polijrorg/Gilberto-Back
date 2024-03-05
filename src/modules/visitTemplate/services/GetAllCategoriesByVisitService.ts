import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitRepository from '../repositories/IVisitRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class GetAllCategoriesByVisitService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(visitId: string): Promise<Categories[] | null> {
    const sellerExists = await this.visitRepository.findById(visitId);

    if (!sellerExists) throw new AppError('A visit with this Id does not exist');

    const seller = await this.categoriesRepository.getAllByVisit(visitId);

    return seller;
  }
}
