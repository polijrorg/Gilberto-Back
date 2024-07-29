/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import IQuestionsRepository from '@modules/visitTemplate/repositories/IQuestionsRepository';
import { Seller } from '@prisma/client';
import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';

interface IQuestionAverageGrade {
  questionId: string;
  questionName: string;
  averageGrade: number;
}

@injectable()
export default class GetAverageGradeByQuestionsManagerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) { }

  public async execute(idManager: string): Promise<(IQuestionAverageGrade & { seller: Seller })[] | null> {
    const grades = await this.questionsGradesRepository.getAllByIDManager(idManager);

    if (!grades) {
      return [];
    }

    const questionGradesMap = new Map<string, { totalGrade: number; count: number, sellers: Seller[] }>();

    // Acumula as notas, a contagem por questão e os vendedores
    grades.forEach((grade) => {
      if (!questionGradesMap.has(grade.questionsId)) {
        questionGradesMap.set(grade.questionsId, { totalGrade: 0, count: 0, sellers: [] });
      }

      const questionData = questionGradesMap.get(grade.questionsId)!;
      questionData.totalGrade += grade.grade;
      questionData.count += 1;
      questionData.sellers.push(grade.seller); // Adiciona o Seller
    });

    const result: (IQuestionAverageGrade & { seller: Seller })[] = [];

    // Obtém o nome das questões, calcula a média e adiciona o Seller
    for (const [questionId, data] of questionGradesMap) {
      const question = await this.questionsRepository.findById(questionId);

      if (question) {
        data.sellers.forEach((seller) => {
          result.push({
            questionId,
            questionName: question.question,
            averageGrade: data.totalGrade / data.count,
            seller,
          });
        });
      }
    }

    return result;
  }
}
