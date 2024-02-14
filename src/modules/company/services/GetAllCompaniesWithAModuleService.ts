import { inject, injectable } from 'tsyringe';

import { Company } from '@prisma/client';

import IModuleCompanyRepository from '../repositories/IModuleCompanyRepository';

@injectable()
export default class DeleteModuleCompanyService {
  constructor(
    @inject('ModuleCompanyRepository')
    private moduleCompanyRepository: IModuleCompanyRepository,
  ) { }

  public async execute(moduleId: string): Promise<Company[] | null> {
    const seller = await this.moduleCompanyRepository.getAllCompaniesWithAModule(moduleId);

    return seller;
  }
}
