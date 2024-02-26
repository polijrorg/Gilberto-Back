import { inject, injectable } from 'tsyringe';

import { Visit } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import IVisitRepository from '../repositories/IVisitRepository';

@injectable()
export default class GetAllVisitBySellerService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(sellerId: string): Promise<Visit[] | null> {
    const sellerExists = await this.sellerRepository.findById(sellerId);

    if (!sellerExists) throw new AppError('A seller with this Id does not exist');

    const seller = await this.visitRepository.getAllBySeller(sellerId);

    return seller;
  }
}
