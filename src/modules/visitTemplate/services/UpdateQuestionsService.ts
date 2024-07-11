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

  public async execute(idQuestion: string, idManger: string, data: IUpdateQuestionsDTO): Promise<Questions | undefined> {
    if (idManger) {
      const manager = await this.managerRepository.findById(idManger);

      if (!manager) {
        throw new AppError('Manager not found', 404);
      }
      const question = await this.questionsRepository.findById(idQuestion);

      if (!question) {
        throw new AppError('Question not found', 404);
      }

      const newQuestion = await this.questionsRepository.update(question.id, data);

      return newQuestion;
    }

    return undefined;
  }
}
