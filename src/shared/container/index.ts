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

container.registerSingleton<ISupervisorRepository>('SupervisorRepository', SupervisorRepository);
container.registerSingleton<ISellerRepository>('SellerRepository', SellerRepository);
container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);
container.registerSingleton<IManagerRepository>('ManagerRepository', ManagerRepository);
