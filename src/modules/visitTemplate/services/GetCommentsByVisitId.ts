import { inject, injectable } from 'tsyringe';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IQuestionsGradesRepository from '@modules/visitTemplate/repositories/IQuestionsGradesRepository';

@injectable()
export default class GetCommentsByVisitId {
  constructor(
    @inject('QuestionsGradesRepository')
    private questionsGradesRepository: IQuestionsGradesRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(visitId: string): Promise<string[] | null> {
    const comments = await this.questionsGradesRepository.getAllCommentsByVisitId(visitId);

    return comments;
  }
}
