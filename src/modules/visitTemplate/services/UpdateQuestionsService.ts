import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

import IUpdateQuestionsDTO from '../dtos/IUpdateQuestionsDTO';
import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class UpdateQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(idCategory: string, idManger: string, data: IUpdateQuestionsDTO): Promise<Questions | undefined> {
    if (idManger) {
      const manager = await this.managerRepository.findById(idManger);

      if (!manager) {
        throw new AppError('Manager not found', 404);
      }
      const category = await this.categoriesRepository.findById(idCategory);

      if (!category) {
        throw new AppError('Category not found', 404);
      }

      const question = await this.questionsRepository.update(idCategory, data);

      return question;
    }

    return undefined;
  }
}
