import prisma from '@shared/infra/prisma/client';
import { Prisma, ActionPlans } from '@prisma/client';

import IActionPlansRepository from '@modules/actionPlans/repositories/IActionPlansRepository';
import IUpdateActionPlansDTO from '@modules/actionPlans/dtos/IUpdateActionPlansDTO';
import ICreateActionPlansDTO from '@modules/actionPlans/dtos/ICreateActionPlansDTO';

export default class ActionPlansRepository implements IActionPlansRepository {
  private ormRepository: Prisma.ActionPlansDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.actionPlans;
  }

  public async findById(id: string): Promise<ActionPlans | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateActionPlansDTO): Promise<ActionPlans> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<ActionPlans> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAll(): Promise<ActionPlans[] | null> {
    const seller = await this.ormRepository.findMany();

    return seller;
  }

  public async update(id: string, data: IUpdateActionPlansDTO): Promise<ActionPlans> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }

  public async markAsDone(id: string): Promise<ActionPlans> {
    const seller = await this.ormRepository.update({ where: { id }, data: { done: true } });

    return seller;
  }
}
