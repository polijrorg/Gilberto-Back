import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class GetAllCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(): Promise<Company[] | null> {
    const seller = await this.companyRepository.getAllCompany();

    return seller;
  }
}
