import { Supervisor } from '@prisma/client';

import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';

interface ISupervisorRepository {
  findByEmailWithRelations(email: string): Promise<Supervisor | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Supervisor | null>;
  create(data: ICreateSupervisorDTO): Promise<Supervisor>;
  delete(id: string): Promise<Supervisor>;
  getAll(): Promise<Supervisor[] | null>;
}

export default ISupervisorRepository;
