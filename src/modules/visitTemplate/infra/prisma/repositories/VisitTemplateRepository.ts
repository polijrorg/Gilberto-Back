import prisma from '@shared/infra/prisma/client';
import { Prisma, VisitTemplate } from '@prisma/client';

import IVisitTemplateRepository from '@modules/visitTemplate/repositories/IVisitTemplateRepository';
import ICreateVisitTemplateDTO from '@modules/visitTemplate/dtos/ICreateVisitTemplateDTO';
import IUpdateVisitTemplateDTO from '@modules/visitTemplate/dtos/IUpdateVisitTemplateDTO';

export default class VisitTemplateRepository implements IVisitTemplateRepository {
  private ormRepository: Prisma.VisitTemplateDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.visitTemplate;
  }

  public async findById(id: string): Promise<VisitTemplate | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateVisitTemplateDTO): Promise<VisitTemplate> {
    const visitTemplate = await this.ormRepository.create({ data });

    return visitTemplate;
  }

  public async delete(id: string): Promise<VisitTemplate> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getByCompany(companyId: string): Promise<VisitTemplate[] | null> {
    const seller = await this.ormRepository.findMany({ where: { companyId } });

    return seller;
  }

  public async getByManager(managerId: string): Promise<VisitTemplate[] | null> {
    const seller = await this.ormRepository.findMany({ where: { managerId } });

    return seller;
  }

  public async getByDirector(directorId: string): Promise<VisitTemplate[] | null> {
    const seller = await this.ormRepository.findMany({ where: { directorId } });

    return seller;
  }

  public async getManagerIdBySeller(sellerId: string): Promise<string | null> {
    const seller = await prisma.seller.findFirst({
      where: { id: sellerId },
      select: { supervisorId: true },
    });

    let supervisor;

    if (seller && seller.supervisorId) {
      supervisor = await prisma.supervisor.findFirst({
        where: { id: seller.supervisorId },
        select: { managerId: true },
      });
    }

    if (supervisor) {
      return supervisor.managerId;
    }

    return null;
  }

  public async getDirectorIdBySeller(sellerId: string): Promise<string | null> {
    const managerId = await this.getManagerIdBySeller(sellerId);

    if (managerId) {
      const manager = await prisma.manager.findFirst({
        where: { id: managerId },
        select: { directorId: true },
      });

      if (manager) {
        return manager.directorId;
      }
    }

    return null; // Se o gerente não for encontrado ou não estiver vinculado a um diretor
  }

  public async getCompanyIdBySeller(sellerId: string): Promise<string | null> {
    const company = await prisma.seller.findFirst({
      where: { id: sellerId },
      select: { companyId: true },
    });

    if (company) {
      return company.companyId;
    }

    return null;
  }

  public async getVisitTemplateForSeller(sellerId: string): Promise<VisitTemplate | null> {
    const managerId = await this.getManagerIdBySeller(sellerId);

    let visitTemplate = await this.ormRepository.findFirst({ where: { managerId } });

    if (visitTemplate) return visitTemplate;

    const directorId = await this.getDirectorIdBySeller(sellerId);

    visitTemplate = await this.ormRepository.findFirst({ where: { directorId } });

    if (visitTemplate) return visitTemplate;

    const companyId = await this.getCompanyIdBySeller(sellerId);

    visitTemplate = await this.ormRepository.findFirst({ where: { companyId } });

    return visitTemplate;
  }

  public async update(id: string, data: IUpdateVisitTemplateDTO): Promise<VisitTemplate> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
