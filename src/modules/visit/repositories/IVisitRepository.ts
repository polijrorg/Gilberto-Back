import { Visit } from '@prisma/client';

import ICreateVisitDTO from '../dtos/ICreateVisitDTO';
import IUpdateVisitDTO from '../dtos/IUpdateVisitDTO';

interface IVisitRepository {
  create(data: ICreateVisitDTO): Promise<Visit>;
  delete(id: string): Promise<Visit>;
  getAllBySeller(sellerId: string): Promise<Visit[] | null>;
  findById(id: string): Promise<Visit | null>;
  update(id: string, data: IUpdateVisitDTO): Promise<Visit>;
}

export default IVisitRepository;
