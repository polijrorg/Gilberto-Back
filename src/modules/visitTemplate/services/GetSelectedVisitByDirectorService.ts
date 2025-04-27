import { inject, injectable } from 'tsyringe';
import { VisitTemplate } from '@prisma/client';
import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetSelectedVisitByManagerService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepo: IVisitTemplateRepository,

    @inject('ManagerRepository')
    private managerRepo: IManagerRepository,
  ) {}

  public async execute(managerId: string): Promise<VisitTemplate | null> {
    const manager = await this.managerRepo.findById(managerId);
    if (!manager) {
      throw new AppError('A manager with this Id does not exist', 404);
    }

    const selected = await this.visitTemplateRepo.getSelectedByManager(
      managerId,
    );

    return selected ? selected[0] ?? null : null;
  }
}
