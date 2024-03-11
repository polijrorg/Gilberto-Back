import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetVisitByManagerService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(managerId: string): Promise<VisitTemplate[] | null> {
    const sellerExists = await this.managerRepository.findById(managerId);

    if (!sellerExists) throw new AppError('A manager with this Id does not exist');

    const seller = await this.visitTemplateRepository.getByManager(managerId);

    return seller;
  }
}
