import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';
import IUpdateVisitTemplateDTO from '../dtos/IUpdateVisitTemplateDTO';

@injectable()
export default class UpdateVisitTemplateService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(id: string, data: IUpdateVisitTemplateDTO): Promise<VisitTemplate> {
    if (data.managerId) {
      const sellerExists = await this.managerRepository.findById(data.managerId);

      if (!sellerExists) throw new AppError('A manager with this Id does not exist');
    }

    if (data.directorId) {
      const sellerExists = await this.directorRepository.findById(data.directorId);

      if (!sellerExists) throw new AppError('A director with this Id does not exist');
    }

    const seller = await this.visitTemplateRepository.update(id, data);

    return seller;
  }
}
