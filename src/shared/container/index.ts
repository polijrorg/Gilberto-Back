import { container } from 'tsyringe';

import './providers';

// Supervisor
import SupervisorRepository from '@modules/supervisor/infra/prisma/repositories/SupervisorRepository';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import SellerRepository from '@modules/seller/infra/prisma/repositories/SellerRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/prisma/repositories/CompanyRepository';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ManagerRepository from '@modules/manager/infra/prisma/repositories/ManagerRepository';
import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ModuleRepository from '@modules/module/infra/prisma/repositories/ModuleRepository';
import IModuleGradesRepository from '@modules/module/repositories/IModuleGradesRepository';
import ModuleGradesRepository from '@modules/module/infra/prisma/repositories/ModuleGradesRepository';
import IModuleCompanyRepository from '@modules/company/repositories/IModuleCompanyRepository';
import ModuleCompanyRepository from '@modules/company/infra/prisma/repositories/ModuleCompanyRepository';

container.registerSingleton<ISupervisorRepository>('SupervisorRepository', SupervisorRepository);
container.registerSingleton<ISellerRepository>('SellerRepository', SellerRepository);
container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);
container.registerSingleton<IManagerRepository>('ManagerRepository', ManagerRepository);
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
container.registerSingleton<IModuleGradesRepository>('ModuleGradesRepository', ModuleGradesRepository);
container.registerSingleton<IModuleCompanyRepository>('ModuleCompanyRepository', ModuleCompanyRepository);
