import { Company } from '@prisma/client';

import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

interface ICompanyRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  delete(id: string): Promise<Company>;
  getAllCompany(): Promise<Company[] | null>;
  findById(id: string): Promise<Company | null>;
  findByName(name:string): Promise<Company | null>;
}

export default ICompanyRepository;
