import { Categories } from '@prisma/client';

import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';

interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Categories>;
  delete(id: string): Promise<Categories>;
  getAllByVisit(visitTemplateId: string): Promise<Categories[] | null>;
  findById(id: string): Promise<Categories | null>;
}

export default ICategoriesRepository;
