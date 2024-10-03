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

  public async getByIdSeller(idSeller: string): Promise<ActionPlans[] | null> {
    const actionPlans = await this.ormRepository.findMany({
      where: { sellerId: idSeller },
    });

    return actionPlans;
  }

  public async findById(id: string): Promise<ActionPlans | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async create(data: ICreateActionPlansDTO): Promise<ActionPlans & { seller: { email: string, name: string }, supervisor: { email: string, name: string } }> {
    // Cria o registro
    const createdActionPlan = await this.ormRepository.create({ data });

    // Consulta o registro criado e seleciona os campos necessários
    const actionPlanWithDetails = await this.ormRepository.findUnique({
      where: { id: createdActionPlan.id },
      select: {
        id: true,
        prize: true,
        comments: true,
        title: true,
        sellerId: true,
        done: true,
        supervisorId: true,
        visitId: true,
        moduleId: true,
        created_at: true,
        seller: {
          select: {
            email: true,
            name: true,
          },
        },
        supervisor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }) as ActionPlans & {
      seller: {
        email: string,
        name: string
      },
      supervisor: {
        name: string,
        email: string
      }
    };

    return actionPlanWithDetails;
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
