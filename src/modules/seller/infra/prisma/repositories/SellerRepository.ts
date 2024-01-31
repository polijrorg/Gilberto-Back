import prisma from '@shared/infra/prisma/client';
import { Prisma, Seller } from '@prisma/client';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import ICreateSellerDTO from '@modules/seller/dtos/ICreateSellerDTO';

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
}
