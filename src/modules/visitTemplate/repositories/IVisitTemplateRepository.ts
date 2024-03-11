import { VisitTemplate } from '@prisma/client';

import ICreateVisitTemplateDTO from '../dtos/ICreateVisitTemplateDTO';
import IUpdateVisitTemplateDTO from '../dtos/IUpdateVisitTemplateDTO';

interface IVisitRepository {
  create(data: ICreateVisitTemplateDTO): Promise<VisitTemplate>;
  delete(id: string): Promise<VisitTemplate>;
  getByCompany(companyId: string): Promise<VisitTemplate[] | null>;
  getByManager(managerId: string): Promise<VisitTemplate[] | null>;
  getByDirector(directorId: string): Promise<VisitTemplate[] | null>;
  findById(id: string): Promise<VisitTemplate | null>;
  update(id: string, data: IUpdateVisitTemplateDTO): Promise<VisitTemplate>;
}

export default IVisitRepository;
