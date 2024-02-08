import { Manager } from '@prisma/client';

import ICreateManagerDTO from '../dtos/ICreateManagerDTO';

interface IManagerRepository {
  create(data: ICreateManagerDTO): Promise<Manager>;
  delete(id: string): Promise<Manager>;
  getAllManagerByCompany(companyId: string): Promise<Manager[] | null>;
  findById(id: string): Promise<Manager | null>;
  findByEmail(email: string): Promise<Manager | null>;
}

export default IManagerRepository;
