import { inject, injectable } from 'tsyringe';

import { QuestionsGrades } from '@prisma/client';

import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';
import IUpdateQuestionsGradesDTO from '../dtos/IUpdateQuestionsGradesDTO';

@injectable()
export default class UpdateQuestionsGradesService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
  ) { }

  public async execute(id: string, data: IUpdateQuestionsGradesDTO): Promise<QuestionsGrades | null> {
    const seller = await this.questionsGradesRepository.update(id, data);

    return seller;
  }
}
