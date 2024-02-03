import { Supervisor } from '@prisma/client';

import IUpdateSupervisorDTO from '@modules/supervisor/dtos/IUpdateSupervisorDTO';
import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';

interface ISupervisorRepository {
  findByEmail(email: string | undefined): Promise<Supervisor | null>;
  create(data: ICreateSupervisorDTO): Promise<Supervisor>;
  delete(id: string): Promise<Supervisor>;
  getAll(companyId: string): Promise<Supervisor[] | null>;
  update(id: string, data: IUpdateSupervisorDTO): Promise<Supervisor>;
}

export default ISupervisorRepository;
