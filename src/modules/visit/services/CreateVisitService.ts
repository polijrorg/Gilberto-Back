import { inject, injectable } from 'tsyringe';

import { Visit } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import IVisitRepository from '../repositories/IVisitRepository';
import ICreateVisitDTO from '../dtos/ICreateVisitDTO';

@injectable()
export default class CreateVisitService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(data: ICreateVisitDTO): Promise<Visit> {
    const sellerExists = await this.sellerRepository.findById(data.sellerId);

    if (!sellerExists) throw new AppError('A seller with this Id does not exist');

    const seller = await this.visitRepository.create(data);

    return seller;
  }
}
