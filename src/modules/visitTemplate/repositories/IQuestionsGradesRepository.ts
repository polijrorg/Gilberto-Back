import { QuestionsGrades, Seller } from '@prisma/client';

import ICreateQuestionsGradesDTO from '../dtos/ICreateQuestionsGradesDTO';
import IUpdateQuestionsGradesDTO from '../dtos/IUpdateQuestionsGradesDTO';

interface IQuestionsGradesRepository {
  create(data: ICreateQuestionsGradesDTO): Promise<QuestionsGrades>;
  delete(id: string): Promise<QuestionsGrades>;
  getAllBySeller(sellerId: string): Promise<QuestionsGrades[] | null>;
  findById(id: string): Promise<QuestionsGrades | null>;
  update(id: string, data: IUpdateQuestionsGradesDTO): Promise<QuestionsGrades | null>;
  getAllByIDSupervisor(idSupervisor: string): Promise<(QuestionsGrades & { seller: Seller })[] | null>;
  getAllByIDManager(idManager: string): Promise<(QuestionsGrades & { seller: Seller })[] | null>;

}

export default IQuestionsGradesRepository;
