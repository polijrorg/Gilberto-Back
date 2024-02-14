import { inject, injectable } from 'tsyringe';

import { ModuleCompany } from '@prisma/client';

import IModuleCompanyRepository from '../repositories/IModuleCompanyRepository';
import ICreateModuleCompanyDTO from '../dtos/ICreateModuleCompanyDTO';

@injectable()
export default class CreateModuleCompanyService {
  constructor(
    @inject('ModuleCompanyRepository')
    private moduleCompanyRepository: IModuleCompanyRepository,
  ) { }

  public async execute(data: ICreateModuleCompanyDTO): Promise<ModuleCompany> {
    const seller = await this.moduleCompanyRepository.create(data);

    return seller;
  }
}
