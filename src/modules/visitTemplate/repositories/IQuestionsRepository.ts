import { Questions } from '@prisma/client';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';
import IUpdateQuestionsDTO from '../dtos/IUpdateQuestionsDTO';

interface IQuestionsRepository {
  create(data: ICreateQuestionsDTO): Promise<Questions>;
  delete(id: string): Promise<Questions>;
  getAllByCategories(categoriesId: string): Promise<Questions[] | null>;
  findById(id: string): Promise<Questions | null>;
  update(id: string, question: IUpdateQuestionsDTO): Promise<Questions>;
}

export default IQuestionsRepository;
