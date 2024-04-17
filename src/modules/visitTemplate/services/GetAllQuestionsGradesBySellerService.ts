import { inject, injectable } from 'tsyringe';

import { QuestionsGrades } from '@prisma/client';

import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';

@injectable()
export default class GetAllQuestionsGradesBySellerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
  ) { }

  public async execute(sellerId: string): Promise<QuestionsGrades[] | null> {
    const seller = await this.questionsGradesRepository.getAllBySeller(sellerId);

    return seller;
  }
}
