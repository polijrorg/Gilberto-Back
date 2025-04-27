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

  private async validateCompany(companyId: string): Promise<void> {
    const companyExists = await this.companyRepository.findById(companyId);
    if (!companyExists) throw new AppError('Company with this ID does not exist');
  }

  private async validateManager(managerId: string): Promise<void> {
    const managerExists = await this.managerRepository.findById(managerId);
    if (!managerExists) throw new AppError('Manager with this ID does not exist');
  }

  private async validateDirector(directorId: string): Promise<void> {
    const directorExists = await this.directorRepository.findById(directorId);
    if (!directorExists) throw new AppError('Director with this ID does not exist');
  }

  public async execute(data: ICreateVisitTemplateDTO): Promise<VisitTemplate> {
    const { companyId, managerId, directorId } = data;

    if (!companyId && !managerId && !directorId) {
      throw new AppError('At least one of Company ID, Manager ID, or Director ID must be provided');
    }

    const validationPromises = [];

    if (companyId) {
      validationPromises.push(this.validateCompany(companyId));
    }

    if (managerId) {
      validationPromises.push(this.validateManager(managerId));
    }

    if (directorId) {
      validationPromises.push(this.validateDirector(directorId));
    }

    await Promise.all(validationPromises);

    return this.visitTemplateRepository.create(data);
  }
}
