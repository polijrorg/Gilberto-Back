import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '../repositories/ICompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(data: ICreateCompanyDTO): Promise<Company> {
    const nameAlreadyExists = await this.companyRepository.findByName(data.name);

    if (nameAlreadyExists) throw new AppError('A company with this name already exists');

    const seller = await this.companyRepository.create(data);

    return seller;
  }
}
