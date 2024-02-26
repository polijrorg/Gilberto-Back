import { inject, injectable } from 'tsyringe';

import { Questions } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IQuestionsRepository from '../repositories/IQuestionsRepository';

@injectable()
export default class DeleteQuestionsService {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(id: string): Promise<Questions> {
    const sellerExists = await this.questionsRepository.findById(id);

    if (!sellerExists) throw new AppError('A questions with this Id does not exist');

    const seller = await this.questionsRepository.delete(id);

    return seller;
  }
}
