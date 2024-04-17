import { inject, injectable } from 'tsyringe';

import { QuestionsGrades } from '@prisma/client';

import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';
import ICreateQuestionsGradesDTO from '../dtos/ICreateQuestionsGradesDTO';

@injectable()
export default class CreateQuestionsGradesService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
  ) { }

  public async execute(data: ICreateQuestionsGradesDTO): Promise<QuestionsGrades> {
    const seller = await this.questionsGradesRepository.create(data);

    return seller;
  }
}
