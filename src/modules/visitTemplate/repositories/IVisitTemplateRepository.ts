import { VisitTemplate } from '@prisma/client';

import ICreateVisitTemplateDTO from '../dtos/ICreateVisitTemplateDTO';
import IUpdateVisitTemplateDTO from '../dtos/IUpdateVisitTemplateDTO';

interface IVisitTemplateRepository {
  create(data: ICreateVisitTemplateDTO): Promise<VisitTemplate>;
  delete(id: string): Promise<VisitTemplate>;
  getByCompany(companyId: string): Promise<VisitTemplate[] | null>;
  getSelectedByCompany(companyId: string): Promise<VisitTemplate[] | null>;
  getByManager(managerId: string): Promise<VisitTemplate[] | null>;
  getSelectedByManager(managerId: string): Promise<VisitTemplate[] | null>;
  getByDirector(directorId: string): Promise<VisitTemplate[] | null>;
  getSelectedByDirector(directorId: string): Promise<VisitTemplate[] | null>;
  getDirectorIdBySeller(sellerId: string): Promise<string | null>;
  getManagerIdBySeller(sellerId: string): Promise<string | null>;
  getCompanyIdBySeller(sellerId: string): Promise<string | null>;
  getVisitTemplateForSeller(sellerId: string): Promise<VisitTemplate | null>;
  findById(id: string): Promise<VisitTemplate | null>;
  update(id: string, data: IUpdateVisitTemplateDTO): Promise<VisitTemplate>;
}

export default IVisitTemplateRepository;
