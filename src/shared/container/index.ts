import { container } from 'tsyringe';

import './providers';

// Supervisor
import SupervisorRepository from '@modules/supervisor/infra/prisma/repositories/SupervisorRepository';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';

container.registerSingleton<ISupervisorRepository>('SupervisorRepository', SupervisorRepository);
