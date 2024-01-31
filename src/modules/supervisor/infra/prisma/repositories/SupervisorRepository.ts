import prisma from '@shared/infra/prisma/client';
import { Prisma, Supervisor } from '@prisma/client';

import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import ICreateSupervisorDTO from '@modules/supervisor/dtos/ICreateSupervisorDTO';

export default class SupervisorRepository implements ISupervisorRepository {
  private ormRepository: Prisma.SupervisorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.supervisor;
  }

  public async findByEmailWithRelations(email: string): Promise<Supervisor | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(email: string): Promise<Supervisor | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: { email } },
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

  public async getAll(): Promise<Supervisor[] | null> {
    const supervisor = await this.ormRepository.findMany();

    return supervisor;
  }
}
