import { inject, injectable } from 'tsyringe';
import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IVisitTemplateRepository
  from '../repositories/IVisitTemplateRepository';

interface IRequest {
  companyId: string;
  templateId: string;
}

@injectable()
export default class SelectVisitTemplateForCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepo: ICompanyRepository,

    @inject('VisitTemplateRepository')
    private vtRepo: IVisitTemplateRepository,
  ) {}

  public async execute({ companyId, templateId }: IRequest): Promise<Company> {
    const company = await this.companyRepo.findById(companyId);
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const template = await this.vtRepo.findById(templateId);
    if (!template || template.companyId !== companyId) {
      throw new AppError(
        'VisitTemplate not found or does not belong to this company',
        400,
      );
    }

    const updated = await this.companyRepo.update(companyId, { selectedVisitTemplateId: templateId });

    return updated;
  }
}
