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
export default class GetAverageGradeByQuestionsManagerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
    @inject('SellersRepository')
    private sellersRepository: ISellersRepository,
  ) { }

  public async execute(idManager: string): Promise<(IQuestionAverageGrade & { seller: Seller })[] | null> {
    const grades = await this.questionsGradesRepository.getAllByIDManager(idManager);

    if (!grades) {
      return [];
    }

    const questionGradesMap = new Map<string, { totalGrade: number; count: number, sellerIds: string[] }>();

    // Acumula as notas, a contagem por questão e os vendedores
    grades.forEach((grade) => {
      if (!questionGradesMap.has(grade.questionsId)) {
        questionGradesMap.set(grade.questionsId, { totalGrade: 0, count: 0, sellerIds: [] });
      }

      const questionData = questionGradesMap.get(grade.questionsId)!;
      questionData.totalGrade += grade.grade;
      questionData.count += 1;
      questionData.sellerIds.push(grade.sellerId); // Adiciona o SellerId
    });

    const result: (IQuestionAverageGrade & { seller: Seller })[] = [];

    // Obtém o nome das questões, calcula a média e adiciona o Seller
    for (const [questionId, data] of questionGradesMap) {
      const question = await this.questionsRepository.findById(questionId);

      if (question) {
        for (const sellerId of data.sellerIds) {
          const seller = await this.sellersRepository.findById(sellerId); // Busca o objeto Seller
          if (seller) {
            result.push({
              questionId,
              questionName: question.question,
              averageGrade: data.totalGrade / data.count,
              seller,
            });
          }
        }
      }
    }

    return result;
  }
}
