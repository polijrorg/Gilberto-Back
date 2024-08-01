/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import IQuestionsRepository from '@modules/visitTemplate/repositories/IQuestionsRepository';
import ISellersRepository from '@modules/seller/repositories/ISellerRepository';
import { Seller } from '@prisma/client';
import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';

interface IQuestionAverageGrade {
  questionId: string;
  questionName: string;
  averageGrade: number;
}

@injectable()
export default class GetAverageGradeByQuestionsSellerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('SellerRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute(idSeller: string): Promise<IQuestionAverageGrade[] | null> {
    const grades = await this.questionsGradesRepository.getAllByIDSeller(idSeller);

    if (!grades || grades.length === 0) {
      return [];
    }

    // Usar um Map para agregar as notas por pergunta
    const questionGradesMap = new Map<string, { totalGrade: number; count: number }>();

    grades.forEach((grade) => {
      if (!questionGradesMap.has(grade.questionsId)) {
        questionGradesMap.set(grade.questionsId, { totalGrade: 0, count: 0 });
      }

      const questionData = questionGradesMap.get(grade.questionsId)!;
      questionData.totalGrade += grade.grade;
      questionData.count += 1;
    });

    const result: IQuestionAverageGrade[] = [];

    for (const [questionId, data] of questionGradesMap) {
      const question = await this.questionsRepository.findById(questionId);

      if (question) {
        result.push({
          questionId,
          questionName: question.question,
          averageGrade: data.totalGrade / data.count,
        });
      }
    }

    return result;
  }
}
