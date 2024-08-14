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
export default class GetAverageGradeByQuestionsManagerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) {}

  public async execute(idManager: string): Promise<IQuestionAverageGrade[] | null> {
    const grades = await this.questionsGradesRepository.getAllByIDManager(idManager);
    const allQuestions = await this.questionsRepository.findAll();

    if (!grades || grades.length === 0) {
      return null; // Retorna null se não houver notas
    }

    const questionGradesMap = new Map<string, { totalGrade: number; count: number }>();

    // Acumula as notas e a contagem por questão
    for (const grade of grades) {
      if (!questionGradesMap.has(grade.questionsId)) {
        questionGradesMap.set(grade.questionsId, { totalGrade: 0, count: 0 });
      }

      const questionData = questionGradesMap.get(grade.questionsId)!;
      questionData.totalGrade += grade.grade;
      questionData.count += 1;
    }

    const result: IQuestionAverageGrade[] = [];

    // Obtém o nome das questões, calcula a média e adiciona ao resultado
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
