import { Visit } from '@prisma/client';

import ICreateVisitDTO from '../dtos/ICreateVisitDTO';

interface IVisitRepository {
  create(data: ICreateVisitDTO): Promise<Visit>;
  delete(id: string): Promise<Visit>;
  getAllBySeller(sellerId: string): Promise<Visit[] | null>;
  findById(id: string): Promise<Visit | null>;
}

export default IVisitRepository;
