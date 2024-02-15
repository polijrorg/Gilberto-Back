import { Supervisor } from '@prisma/client';

import IUpdateSupervisorDTO from '@modules/supervisor/dtos/IUpdateSupervisorDTO';
import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';

interface ISupervisorRepository {
  findById(id: string): Promise<Supervisor | null>;
  findByEmail(email: string | undefined): Promise<Supervisor | null>;
  create(data: ICreateSupervisorDTO): Promise<Supervisor>;
  delete(id: string): Promise<Supervisor>;
  getAllSupervidorFromACompany(companyId: string): Promise<Supervisor[] | null>;
  getAllSupervidorFromAManager(managerId: string): Promise<Supervisor[] | null>;
  update(id: string, data: IUpdateSupervisorDTO): Promise<Supervisor>;
}

export default ISupervisorRepository;
