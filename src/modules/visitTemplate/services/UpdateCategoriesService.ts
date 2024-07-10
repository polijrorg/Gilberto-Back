import { inject, injectable } from 'tsyringe';

import { Categories } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import IUpdateCategoriesDTO from '../dtos/IUpdateCategoriesDTO';

@injectable()
export default class UpdateCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(idCategory: string, data: IUpdateCategoriesDTO, idManger: string): Promise<Categories | undefined> {
    if (idManger) {
      const manager = await this.managerRepository.findById(idManger);

      if (!manager) {
        throw new AppError('Manager not found', 404);
      }
      const newCategory = await this.categoriesRepository.update(idCategory, data);

      return newCategory;
    }

    return undefined;
  }
}
