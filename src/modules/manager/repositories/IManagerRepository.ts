import { Manager } from '@prisma/client';

import ICreateManagerDTO from '../dtos/ICreateManagerDTO';
import IUpdateManagerDTO from '../dtos/IUpdateManagerDTO';

interface IManagerRepository {
  findById(id: string): Promise<Manager | null>;
  findByEmail(email: string): Promise<Manager | null>;
  create(data: ICreateManagerDTO): Promise<Manager>;
  delete(id: string): Promise<Manager>;
  getAllManagerByCompany(companyId: string): Promise<Manager[] | null>;
  getAllManagerByDirector(directorId: string): Promise<Manager[] | null>;
  update(id: string, data: IUpdateManagerDTO): Promise<Manager>;
}

export default IManagerRepository;
