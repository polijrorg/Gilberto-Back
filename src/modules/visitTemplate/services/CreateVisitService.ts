import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';
import ICreateVisitTemplateDTO from '../dtos/ICreateVisitTemplateDTO';

@injectable()
export default class CreateVisitTemplateService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(data: ICreateVisitTemplateDTO): Promise<VisitTemplate> {
    if (!data.companyId) {
      throw new AppError('Company ID is missing');
    }

    const sellerExists = await this.companyRepository.findById(data.companyId);

    if (!sellerExists) throw new AppError('A company with this Id does not exist');

    const seller = await this.visitTemplateRepository.create(data);

    return seller;
  }
}
