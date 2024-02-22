import prisma from '@shared/infra/prisma/client';
import { Prisma, Seller, Supervisor } from '@prisma/client';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import ICreateSellerDTO from '@modules/seller/dtos/ICreateSellerDTO';
import IUpdateSellerDTO from '@modules/seller/dtos/IUpdateSellerDTO';

export default class SellerRepository implements ISellerRepository {
  private ormRepository: Prisma.SellerDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.seller;
  }

  public async findByEmail(email: string): Promise<Seller | null> {
    const seller = await this.ormRepository.findFirst({ where: { email } });

    return seller;
  }

  public async findById(id: string): Promise<Seller | null> {
    const seller = await this.ormRepository.findFirst({ where: { id } });

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

  public async getAllSellerFromAManager(managerId: string): Promise<Seller[] | null> {
    const supervisors = await prisma.supervisor.findMany({
      where: { managerId },
      include: {
        seller: true,
      },
    });

    const sellers = supervisors.flatMap(supervisor => supervisor.sellers);

    return sellers.length > 0 ? sellers : null;
  }

  public async getAllSellerFromACompany(companyId: string): Promise<Seller[] | null> {
    const seller = await this.ormRepository.findMany({ where: { companyId }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async updateSeller(id: string, data : IUpdateSellerDTO): Promise<Seller> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
