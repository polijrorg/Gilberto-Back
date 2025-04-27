import { inject, injectable } from 'tsyringe';
import { VisitTemplate } from '@prisma/client';
import AppError from '@shared/errors/AppError';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetSelectedVisitByCompanyService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepo: IVisitTemplateRepository,

    @inject('CompanyRepository')
    private companyRepo: ICompanyRepository,
  ) {}

  public async execute(companyId: string): Promise<VisitTemplate | null> {
    const company = await this.companyRepo.findById(companyId);
    if (!company) {
      throw new AppError('A company with this Id does not exist', 404);
    }

    const selected = await this.visitTemplateRepo.getSelectedByCompany(
      companyId,
    );

    return selected ? selected[0] ?? null : null;
  }
}
