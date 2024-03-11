import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class DeleteCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(id: string): Promise<Categories> {
    const sellerExists = await this.categoriesRepository.findById(id);

    if (!sellerExists) throw new AppError('A category with this Id does not exist');

    const seller = await this.categoriesRepository.delete(id);

    return seller;
  }
}
