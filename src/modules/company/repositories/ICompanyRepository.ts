import { Company, Director } from '@prisma/client';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '../dtos/IUpdateCompanyDTO';

interface ICompanyRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  delete(id: string): Promise<Company>;
  getAllCompany(): Promise<(Company & { director: Director[]})[] | null>;
  findById(id: string): Promise<(Company & { directors: Director[]}) | null>;
  findByName(name: string | undefined): Promise<Company | null>;
  update(id: string, data: IUpdateCompanyDTO): Promise<Company>;
}

export default ICompanyRepository;
