/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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
  ) {}

  private async validateExistence(data: ICreateVisitTemplateDTO): Promise<void> {
    const validations = [
      {
        check: async () => data.companyId && !(await this.companyRepository.findById(data.companyId)),
        error: 'Company with this ID does not exist',
      },
      {
        check: () => data.companyId && this.visitTemplateRepository.getByCompany(data.companyId),
        error: 'A VisitTemplate with this company already exists',
      },
      {
        check: () => data.managerId && this.visitTemplateRepository.getByManager(data.managerId),
        error: 'A VisitTemplate with this manager already exists',
      },
      {
        check: () => data.directorId && this.visitTemplateRepository.getByDirector(data.directorId),
        error: 'A VisitTemplate with this director already exists',
      },
      {
        check: () => !data.companyId,
        error: 'Company ID is missing',
      },
      {
        check: () => !data.managerId,
        error: 'Manager ID is missing',
      },
      {
        check: () => !data.directorId,
        error: 'Director ID is missing',
      },
    ];

    for (const validation of validations) {
      if (await validation.check()) {
        throw new AppError(validation.error);
      }
    }
  }

  public async execute(data: ICreateVisitTemplateDTO): Promise<VisitTemplate> {
    await this.validateExistence(data);

    return this.visitTemplateRepository.create(data);
  }
}
