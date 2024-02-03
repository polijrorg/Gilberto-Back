import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromASupervisorService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(supervisorId: string): Promise<Seller[] | null> {
    const seller = await this.sellerRepository.getAllSellerFromASupervisor(supervisorId);

    return seller;
  }
}
