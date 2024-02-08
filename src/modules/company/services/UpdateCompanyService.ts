import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequest {
  image?: string
  name?: string;
}

@injectable()
export default class UpdateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(id: string, { image, name }: IRequest): Promise<Company> {
    const companyExists = await this.companyRepository.findById(id);

    if (!companyExists) throw new AppError('A company with this ID does not exist');

    const nameAlreadyExists = await this.companyRepository.findByName(name);

    if (nameAlreadyExists) throw new AppError('A company with this name already exists');

    const seller = await this.companyRepository.update(id, { name, image });

    return seller;
  }
}
