import { inject, injectable } from 'tsyringe';

import { Company, Director } from '@prisma/client';

import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class GetAllCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(): Promise<(Company & { director: Director[]})[] | null> {
    const seller = await this.companyRepository.getAllCompany();

    return seller;
  }
}
