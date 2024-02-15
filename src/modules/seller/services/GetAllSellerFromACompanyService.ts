import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from 'modules/company/repositories/ICompanyRepository';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromACompanyService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) { }

  public async execute(companyId: string): Promise<Seller[] | null> {
    const supervisorExists = await this.companyRepository.findById(companyId);

    if (!supervisorExists) throw new AppError('A company with this Id does not exist');

    const seller = await this.sellerRepository.getAllSellerFromACompany(companyId);

    return seller;
  }
}
