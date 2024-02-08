import { Company } from '@prisma/client';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import IUpdateCompanyDTO from '../dtos/IUpdateCompanyDTO';

interface ICompanyRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  delete(id: string): Promise<Company>;
  getAllCompany(): Promise<Company[] | null>;
  findById(id: string): Promise<Company | null>;
  findByName(name: string | undefined): Promise<Company | null>;
  update(id: string, data: IUpdateCompanyDTO): Promise<Company>;
}

export default ICompanyRepository;
