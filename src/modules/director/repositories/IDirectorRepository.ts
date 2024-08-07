import { Director, Company } from '@prisma/client';

import ICreateDirectorDTO from '../dtos/ICreateDirectorDTO';
import IUpdateDirectorDTO from '../dtos/IUpdateDirectorDTO';

interface IDirectorRepository {
  findById(id: string): Promise<(Director & {company: Company}) | null>;
  findAll(): Promise<(Director & {company: Company})[]>;
  findByEmail(email: string): Promise<Director | null>;
  create(data: ICreateDirectorDTO): Promise<Director>;
  delete(id: string): Promise<Director>;
  getAllDirectorByCompany(companyId: string): Promise<Director[] | null>;
  update(id: string, data: IUpdateDirectorDTO): Promise<Director>;
}

export default IDirectorRepository;
