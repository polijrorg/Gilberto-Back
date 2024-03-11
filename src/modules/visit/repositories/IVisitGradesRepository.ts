import { VisitGrades } from '@prisma/client';

import ICreateVisitGradesDTO from '../dtos/ICreateVisitGradesDTO';
import IUpdateVisitGradesDTO from '../dtos/IUpdateVisitGradesDTO';

interface IVisitGradesRepository {
  create(data: ICreateVisitGradesDTO): Promise<VisitGrades>;
  delete(id: string): Promise<VisitGrades>;
  getAllBySeller(sellerId: string): Promise<VisitGrades[] | null>;
  findById(id: string): Promise<VisitGrades | null>;
  update(id: string, data: IUpdateVisitGradesDTO): Promise<VisitGrades>;
}

export default IVisitGradesRepository;
