import { inject, injectable } from 'tsyringe';

import { Company, Director } from '@prisma/client';

import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class GetCompanyByidService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(id: string): Promise<(Company & { directors: Director[]}) | null> {
    const seller = await this.companyRepository.findById(id);

    return seller;
  }
}
