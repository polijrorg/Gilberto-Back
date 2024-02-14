import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import IModuleCompanyRepository from '../repositories/IModuleCompanyRepository';

@injectable()
export default class DeleteModuleCompanyService {
  constructor(
    @inject('ModuleCompanyRepository')
    private moduleCompanyRepository: IModuleCompanyRepository,
  ) { }

  public async execute(companyId: string): Promise<Module[] | null> {
    const seller = await this.moduleCompanyRepository.getAllModulesFromACompany(companyId);

    return seller;
  }
}
