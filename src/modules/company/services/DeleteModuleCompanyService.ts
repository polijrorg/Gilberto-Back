import { inject, injectable } from 'tsyringe';

import { ModuleCompany } from '@prisma/client';

import IModuleCompanyRepository from '../repositories/IModuleCompanyRepository';

@injectable()
export default class DeleteModuleCompanyService {
  constructor(
    @inject('ModuleCompanyRepository')
    private moduleCompanyRepository: IModuleCompanyRepository,
  ) { }

  public async execute(id: string): Promise<ModuleCompany> {
    const seller = await this.moduleCompanyRepository.delete(id);

    return seller;
  }
}
