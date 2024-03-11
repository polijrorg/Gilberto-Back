import { Questions } from '@prisma/client';

import ICreateQuestionsDTO from '../dtos/ICreateQuestionsDTO';

interface IQuestionsRepository {
  create(data: ICreateQuestionsDTO): Promise<Questions>;
  delete(id: string): Promise<Questions>;
  getAllByCategories(categoriesId: string): Promise<Questions[] | null>;
  findById(id: string): Promise<Questions | null>;
}

export default IQuestionsRepository;
