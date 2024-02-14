import { ModuleCompany, Module, Company } from '@prisma/client';

import ICreateModuleCompanyDTO from '../dtos/ICreateModuleCompanyDTO';

interface IModuleCompanyRepository {
  create(data: ICreateModuleCompanyDTO): Promise<ModuleCompany>;
  delete(id: string): Promise<ModuleCompany>;
  getAllModuleCompany(): Promise<ModuleCompany[] | null>;
  getAllModulesFromACompany(companyId: string): Promise<Module[] | null>;
  getAllCompaniesWithAModule(moduleId: string): Promise<Company[] | null>;
}

export default IModuleCompanyRepository;
