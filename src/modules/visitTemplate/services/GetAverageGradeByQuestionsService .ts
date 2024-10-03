/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import IQuestionsRepository from '@modules/visitTemplate/repositories/IQuestionsRepository';
import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';

interface IQuestionAverageGrade {
  questionId: string;
  questionName: string;
  averageGrade: number;
}

@injectable()
export default class GetAverageGradeByQuestionsService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) {}

  public async execute(idSupervisor: string): Promise<IQuestionAverageGrade[]> {
    const grades = await this.questionsGradesRepository.getAllByIDSupervisor(idSupervisor);
    const allQuestions = await this.questionsRepository.findAll();

    const questionGradesMap = new Map<string, { totalGrade: number; count: number }>();

    // Acumula as notas e a contagem por questão
    grades?.forEach((grade) => {
      if (!questionGradesMap.has(grade.questionsId)) {
        questionGradesMap.set(grade.questionsId, { totalGrade: 0, count: 0 });
      }

      const questionData = questionGradesMap.get(grade.questionsId)!;
      questionData.totalGrade += grade.grade;
      questionData.count += 1;
    });

    const result: IQuestionAverageGrade[] = [];

    // Obtém o nome das questões, calcula a média e adiciona ao resultado
    if (!allQuestions) {
      throw new Error('No questions found');
    }

    for (const question of allQuestions) {
      const data = questionGradesMap.get(question.id);

      if (data) {
        result.push({
          questionId: question.id,
          questionName: question.question,
          averageGrade: data.totalGrade / data.count,
        });
      } else {
        // Adiciona questões sem notas
        result.push({
          questionId: question.id,
          questionName: question.question,
          averageGrade: 0,
        });
      }
    }

    return result;
  }
}
