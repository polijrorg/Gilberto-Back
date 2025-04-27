import { inject, injectable } from 'tsyringe';
import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IVisitTemplateRepository
  from '../repositories/IVisitTemplateRepository';

interface IRequest {
  managerId: string;
  templateId: string;
}

@injectable()
export default class SelectVisitTemplateForManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepo: IManagerRepository,

    @inject('VisitTemplateRepository')
    private vtRepo: IVisitTemplateRepository,
  ) {}

  public async execute({ managerId, templateId }: IRequest): Promise<Manager> {
    const manager = await this.managerRepo.findById(managerId);
    if (!manager) {
      throw new AppError('Manager not found', 404);
    }

    const template = await this.vtRepo.findById(templateId);
    if (!template || template.managerId !== managerId) {
      throw new AppError(
        'VisitTemplate not found or does not belong to this manager',
        400,
      );
    }

    const updated = await this.managerRepo.update(managerId, { selectedVisitTemplateId: templateId });

    return updated;
  }
}
