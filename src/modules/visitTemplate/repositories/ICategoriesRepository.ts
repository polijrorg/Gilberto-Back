import { Categories } from '@prisma/client';

import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';
import IUpdateCategoriesDTO from '../dtos/IUpdateCategoriesDTO';

interface ICategoriesRepository {
  create(data: ICreateCategoriesDTO): Promise<Categories>;
  delete(id: string): Promise<Categories>;
  getAllByVisit(visitTemplateId: string): Promise<Categories[] | null>;
  findById(id: string): Promise<Categories | null>;
  update(id: string, data: IUpdateCategoriesDTO): Promise<Categories>;
}

export default ICategoriesRepository;
