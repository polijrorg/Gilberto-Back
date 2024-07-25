/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import { VisitTemplate } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';
import ICreateVisitTemplateDTO from '../dtos/ICreateVisitTemplateDTO';

@injectable()
export default class CreateVisitTemplateService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) {}

  private async validateCompany(companyId: string | undefined): Promise<void> {
    if (!companyId) throw new AppError('Company ID is missing');

    const companyExists = await this.companyRepository.findById(companyId);
    if (!companyExists) throw new AppError('Company with this ID does not exist');

    const existingByCompany = await this.visitTemplateRepository.getByCompany(companyId);
    if (existingByCompany) throw new AppError('A VisitTemplate with this company already exists');
  }

  private async validateManager(managerId: string | undefined): Promise<void> {
    if (!managerId) throw new AppError('Manager ID is missing');

    const managerExists = await this.managerRepository.findById(managerId);
    if (!managerExists) throw new AppError('Manager with this ID does not exist');

    const existingByManager = await this.visitTemplateRepository.getByManager(managerId);
    if (existingByManager) throw new AppError('A VisitTemplate with this manager already exists');
  }

  private async validateDirector(directorId: string | undefined): Promise<void> {
    if (!directorId) throw new AppError('Director ID is missing');

    const directorExists = await this.directorRepository.findById(directorId);
    if (!directorExists) throw new AppError('Director with this ID does not exist');

    const existingByDirector = await this.visitTemplateRepository.getByDirector(directorId);
    if (existingByDirector) throw new AppError('A VisitTemplate with this director already exists');
  }

  public async execute(data: ICreateVisitTemplateDTO): Promise<VisitTemplate> {
    await Promise.all([
      this.validateCompany(data.companyId),
      this.validateManager(data.managerId),
      this.validateDirector(data.directorId),
    ]);

    return this.visitTemplateRepository.create(data);
  }
}
