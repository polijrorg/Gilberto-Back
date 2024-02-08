import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequest {
  image: string
  name: string;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute({
    image, name,
  }: IRequest): Promise<Company> {
    const nameAlreadyExists = await this.companyRepository.findByName(name);

    if (nameAlreadyExists) throw new AppError('A company with this name already exists');

    const seller = await this.companyRepository.create({
      image,
      name,
    });

    return seller;
  }
}
