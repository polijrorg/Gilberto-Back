import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';

@injectable()
export default class CreateQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(data: ICreateQuestionsDTO): Promise<Questions> {
    const sellerExists = await this.categoriesRepository.findById(data.categoriesId);

    if (!sellerExists) throw new AppError('A category with this Id does not exist');

    const seller = await this.questionsRepository.create(data);

    return seller;
  }
}
