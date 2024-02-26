import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

@injectable()
export default class GetAllQuestionsByCategoryService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(categoriesId: string): Promise<Questions[] | null> {
    const sellerExists = await this.categoriesRepository.findById(categoriesId);

    if (!sellerExists) throw new AppError('A category with this Id does not exist');

    const seller = await this.questionsRepository.getAllByCategories(categoriesId);

    return seller;
  }
}
