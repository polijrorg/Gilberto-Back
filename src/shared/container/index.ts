import { container } from 'tsyringe';

import './providers';

// Supervisor
import SupervisorRepository from '@modules/supervisor/infra/prisma/repositories/SupervisorRepository';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import SellerRepository from '@modules/seller/infra/prisma/repositories/SellerRepository';

container.registerSingleton<ISupervisorRepository>('SupervisorRepository', SupervisorRepository);
container.registerSingleton<ISellerRepository>('SellerRepository', SellerRepository);
