/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { QuestionsGrades, Categories } from '@prisma/client';
import IQuestionsGradesRepository from '../repositories/IQuestionsGradesRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface ICategoryAverageGrade {
  categoryId: string;
  categoryName: string;
  averageGrade: number;
}

@injectable()
export default class GetAverageGradeByQuestionsManagerService {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(idManager: string): Promise<ICategoryAverageGrade[] | null> {
    const grades = await this.questionsGradesRepository.getAllByIDManager(idManager);
    const allCategories = await this.categoriesRepository.findAll();

    if (!grades || grades.length === 0) {
      throw new AppError('No grades found for this supervisor');
    }

    if (!allCategories || allCategories.length === 0) {
      throw new AppError('No categories found');
    }

    const categoryGradesMap = this.mapGradesToCategories(grades);
    return this.calculateAverageGrades(allCategories, categoryGradesMap);
  }

  private mapGradesToCategories(grades: (QuestionsGrades & { question: { categories: Categories } })[]): Map<string, { totalGrade: number; count: number }> {
    const categoryGradesMap = new Map<string, { totalGrade: number; count: number }>();

    grades.forEach((grade) => {
      const categoryId = grade.question.categories.id;

      if (!categoryGradesMap.has(categoryId)) {
        categoryGradesMap.set(categoryId, { totalGrade: 0, count: 0 });
      }

      const currentGradeData = categoryGradesMap.get(categoryId);
      if (currentGradeData) {
        currentGradeData.totalGrade += grade.grade;
        currentGradeData.count += 1;
      }
    });

    return categoryGradesMap;
  }

  private calculateAverageGrades(
    categories: Categories[],
    categoryGradesMap: Map<string, { totalGrade: number; count: number }>,
  ): ICategoryAverageGrade[] {
    return categories.map((category) => {
      const gradeData = categoryGradesMap.get(category.id);

      return {
        categoryId: category.id,
        categoryName: category.name,
        averageGrade: gradeData ? gradeData.totalGrade / gradeData.count : 0,
      };
    });
  }
}
