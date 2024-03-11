import { inject, injectable } from 'tsyringe';

import { VisitGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import IVisitGradesRepository from '../repositories/IVisitGradesRepository';

@injectable()
export default class GetAllVisitGradesService {
  constructor(
    @inject('VisitGradesRepository')
    private visitGradesRepository: IVisitGradesRepository,
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(sellerId: string): Promise<VisitGrades[] | null> {
    const sellerExists = await this.sellerRepository.findById(sellerId);

    if (!sellerExists) throw new AppError('A seller with this Id does not exist');

    const seller = await this.visitGradesRepository.getAllBySeller(sellerId);

    return seller;
  }
}
