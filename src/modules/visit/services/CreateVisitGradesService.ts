import { inject, injectable } from 'tsyringe';

import { VisitGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import IVisitRepository from '../repositories/IVisitRepository';
import IVisitGradesRepository from '../repositories/IVisitGradesRepository';
import ICreateVisitGradesDTO from '../dtos/ICreateVisitGradesDTO';

@injectable()
export default class CreateVisitGradesService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
    @inject('VisitGradesRepository')
    private visitGradesRepository: IVisitGradesRepository,
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(data: ICreateVisitGradesDTO): Promise<VisitGrades> {
    const sellerExists = await this.sellerRepository.findById(data.sellerId);

    if (!sellerExists) throw new AppError('A seller with this Id does not exist');

    const visitExists = await this.visitRepository.findById(data.visitId);

    if (!visitExists) throw new AppError('A visit with this Id does not exist');

    const seller = await this.visitGradesRepository.create(data);

    return seller;
  }
}
