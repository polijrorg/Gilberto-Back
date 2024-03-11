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

  public async update(id: string, data: IUpdateVisitTemplateDTO): Promise<VisitTemplate> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
