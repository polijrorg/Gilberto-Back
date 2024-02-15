import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisorFromCompanyService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(companyId: string): Promise<Supervisor[] | null> {
    const companyExists = await this.companyRepository.findById(companyId);

    if (!companyExists) throw new AppError('A company with this Id does not exist');

    const supervisor = await this.supervisorRepository.getAllSupervidorFromACompany(companyId);

    return supervisor;
  }
}
