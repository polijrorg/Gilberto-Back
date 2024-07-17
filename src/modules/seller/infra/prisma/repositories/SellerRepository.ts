import prisma from '@shared/infra/prisma/client';
import {
  Prisma, Seller,
} from '@prisma/client';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import ICreateSellerDTO from '@modules/seller/dtos/ICreateSellerDTO';
import IUpdateSellerDTO from '@modules/seller/dtos/IUpdateSellerDTO';
import ReceiveSellerInfosDTO from '@modules/seller/dtos/IReceiveSellerInfosDTO';

export default class SellerRepository implements ISellerRepository {
  private ormRepository: Prisma.SellerDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.seller;
  }

  public async getManagerAndDirectorFromSeller(sellerId: string): Promise<{ managerId: string | null, directorId: string | null} | null> {
    const seller = await this.ormRepository.findUnique({ where: { id: sellerId }, include: { supervisor: { include: { manager: true } } } });
    return seller && seller.supervisor && seller.supervisor.manager ? { managerId: seller.supervisor.managerId, directorId: seller.supervisor.manager.directorId } : null;
  }

  public async findByEmail(email: string): Promise<Seller | null> {
    const seller = await this.ormRepository.findFirst({ where: { email } });

    return seller;
  }

  public async findById(id: string): Promise<Seller | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

    return seller;
  }

  public async findByIdAndData(id: string, day: string): Promise<ReceiveSellerInfosDTO | null> {
    const seller = await this.ormRepository.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        visit: {
          where: {
            dateVisited: day,
          },
          select: {
            created_at: true,
            storeVisited: true,
            grade: true,
            QuestionsGrades: true,
            visitTemplateId: true,
            visitTemplate: {
              select: {
                categories: {
                  select: {
                    name: true,
                    questions: {
                      select: {
                        question: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return seller;
  }

  public async create(data: ICreateSellerDTO): Promise<Seller> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Seller> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllSellerFromASupervisor(supervisorId: string): Promise<Seller[] | null> {
    const seller = await this.ormRepository.findMany({ where: { supervisorId }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async getAllSellerPendenteFromASupervisor(supervisorId: string): Promise<Seller[] | null> {
    const seller = await this.ormRepository.findMany({ where: { supervisorId, stage: 'Pendente' }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async getAllSellerMentoriaFromASupervisor(supervisorId: string): Promise<Seller[] | null> {
    const seller = await this.ormRepository.findMany({ where: { supervisorId, stage: 'Mentoria' }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async getAllSellerVisitaFromASupervisor(supervisorId: string): Promise<Seller[] | null> {
    const seller = await this.ormRepository.findMany({ where: { supervisorId, stage: 'Visita' }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async getAllSellerFromAManager(managerId: string): Promise<Seller[] | null> {
    const supervisors = await prisma.supervisor.findMany({
      where: { managerId },
      include: {
        seller: true,
      },
    });

    const sellers: Seller[] = supervisors
      .map((supervisor) => supervisor.seller)
      .reduce((acc, sellerArray) => acc.concat(sellerArray), []);

    const sortedSellers = sellers.sort((a, b) => a.name.localeCompare(b.name));

    return sortedSellers.length > 0 ? sortedSellers : null;
  }

  public async getAllSellerFromADirector(directorId: string): Promise<Seller[] | null> {
    const managers = await prisma.manager.findMany({
      where: { directorId },
      include: {
        supervisor: {
          include: {
            seller: true,
          },
        },
      },
    });

    const sellers: Seller[] = [];

    managers.forEach((manager) => {
      manager.supervisor.forEach((supervisor) => {
        sellers.push(...supervisor.seller);
      });
    });

    const sortedSellers = sellers.sort((a, b) => a.name.localeCompare(b.name));

    return sortedSellers.length > 0 ? sortedSellers : null;
  }

  public async getAllSellerFromACompany(companyId: string): Promise<(Seller & { supervisor: { name: string } })[] | null> {
    const seller = await this.ormRepository.findMany({
      where: { companyId },
      include: { supervisor: { select: { name: true } } },
      orderBy: { name: 'asc' },
    });

    return seller;
  }

  public async updateSeller(id: string, data : IUpdateSellerDTO): Promise<Seller> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
