import { inject, injectable } from 'tsyringe';

import { ModuleCompany } from '@prisma/client';

import IModuleCompanyRepository from '../repositories/IModuleCompanyRepository';

@injectable()
export default class GetAllCompanyService {
  constructor(
    @inject('ModuleCompanyRepository')
    private moduleCompanyRepository: IModuleCompanyRepository,
  ) { }

  public async execute(): Promise<ModuleCompany[] | null> {
    const seller = await this.moduleCompanyRepository.getAllModuleCompany();

    return seller;
  }
}
