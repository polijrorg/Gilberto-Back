import prisma from '@shared/infra/prisma/client';
import { Prisma, Supervisor } from '@prisma/client';

import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import ICreateSupervisorDTO from '@modules/supervisor/dtos/ICreateSupervisorDTO';
import IUpdateSupervisorDTO from '@modules/supervisor/dtos/IUpdateSupervisorDTO';

export default class SupervisorRepository implements ISupervisorRepository {
  private ormRepository: Prisma.SupervisorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.supervisor;
  }

  public async findById(id: string): Promise<Supervisor | null> {
    const user = await this.ormRepository.findFirst({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<Supervisor | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async create(data: ICreateSupervisorDTO): Promise<Supervisor> {
    const supervisor = await this.ormRepository.create({ data });

    return supervisor;
  }

  public async delete(id: string): Promise<Supervisor> {
    const supervisor = await this.ormRepository.delete({ where: { id } });

    return supervisor;
  }

  public async getAllSupervidorFromACompany(companyId: string): Promise<Supervisor[] | null> {
    const supervisor = await this.ormRepository.findMany({
      where: { companyId },
      orderBy: {
        name: 'asc',
      },
    });

    return supervisor;
  }

  public async getAllSupervidorFromAManager(managerId: string): Promise<Supervisor[] | null> {
    const supervisor = await this.ormRepository.findMany({
      where: { managerId },
      orderBy: {
        name: 'asc',
      },
    });

    return supervisor;
  }

  public async update(id: string, data: IUpdateSupervisorDTO): Promise<Supervisor> {
    const supervisor = await this.ormRepository.update({ where: { id }, data });

    return supervisor;
  }
}
