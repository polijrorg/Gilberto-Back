import { inject, injectable } from 'tsyringe';

import { QuestionsGrades } from '@prisma/client';

import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';

@injectable()
export default class DeleteQuestionsGradesService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
  ) { }

  public async execute(id: string): Promise<QuestionsGrades> {
    const seller = await this.questionsGradesRepository.delete(id);

    return seller;
  }
}
