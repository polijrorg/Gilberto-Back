import { QuestionsGrades, Categories } from '@prisma/client';

import ICreateQuestionsGradesDTO from '../dtos/ICreateQuestionsGradesDTO';
import IUpdateQuestionsGradesDTO from '../dtos/IUpdateQuestionsGradesDTO';

interface IQuestionsGradesRepository {
  create(data: ICreateQuestionsGradesDTO): Promise<QuestionsGrades>;
  delete(id: string): Promise<QuestionsGrades>;
  getAllBySeller(sellerId: string): Promise<QuestionsGrades[] | null>;
  getAllCommentsByVisitId(visitId: string): Promise<string[]>;
  findById(id: string): Promise<QuestionsGrades | null>;
  update(id: string, data: IUpdateQuestionsGradesDTO): Promise<QuestionsGrades | null>;
  getAllByIDSupervisor(idSupervisor: string): Promise<(QuestionsGrades & { question: { categories: Categories } })[] | null>;
  getAllByIDManager(idManager: string): Promise<(QuestionsGrades & { question: { categories: Categories } })[] | null>;
  getAllByIDSeller(idSeller: string): Promise<(QuestionsGrades & { question: { categories: Categories } })[] | null>;

}

export default IQuestionsGradesRepository;
