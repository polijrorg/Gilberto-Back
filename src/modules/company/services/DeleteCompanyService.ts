import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '../repositories/ICompanyRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Company> {
    const sellerExists = await this.companyRepository.findById(id);

    if (!sellerExists) throw new AppError('This company does not exist');

    const seller = await this.companyRepository.delete(id);

    return seller;
  }
}
