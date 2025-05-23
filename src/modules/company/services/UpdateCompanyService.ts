import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitTemplateRepository from '@modules/visitTemplate/repositories/IVisitTemplateRepository';
import ICompanyRepository from '../repositories/ICompanyRepository';
import IUpdateCompanyDTO from '../dtos/IUpdateCompanyDTO';

@injectable()
export default class UpdateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
    @inject('VisitTemplateRepository')
    private vtRepo: IVisitTemplateRepository,
  ) { }

  public async execute(id: string, data: IUpdateCompanyDTO): Promise<Company> {
    const companyExists = await this.companyRepository.findById(id);

    if (!companyExists) throw new AppError('A company with this ID does not exist');

    if (data.name) {
      const nameAlreadyExists = await this.companyRepository.findByName(data.name);

      if (nameAlreadyExists) throw new AppError('A company with this name already exists');
    }

    if (data.selectedVisitTemplateId) {
      const selectedVisitTemplateId = await this.vtRepo.findById(data.selectedVisitTemplateId);

      if (!selectedVisitTemplateId) throw new AppError('This selectedVisitTemplate does not exist');
    }

    const seller = await this.companyRepository.update(id, data);

    return seller;
  }
}
