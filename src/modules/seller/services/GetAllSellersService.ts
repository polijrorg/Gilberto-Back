import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerMentoriaFromASupervisorService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(): Promise<Seller[] | null> {
    const seller = await this.sellerRepository.getAll();

    return seller;
  }
}
