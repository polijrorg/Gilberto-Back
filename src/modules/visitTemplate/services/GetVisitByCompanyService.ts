import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetVisitByCompanyService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(companyId: string): Promise<VisitTemplate[] | null> {
    const sellerExists = await this.companyRepository.findById(companyId);

    if (!sellerExists) throw new AppError('A company with this Id does not exist');

    const seller = await this.visitTemplateRepository.getByCompany(companyId);

    return seller;
  }
}
