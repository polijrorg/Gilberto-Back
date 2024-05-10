import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '../repositories/ISellerRepository';
import ICreateSellerDTO from '../dtos/ICreateSellerDTO';

@injectable()
export default class CreateSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(data: ICreateSellerDTO): Promise<Seller> {
    const emailAlreadyExists = await this.sellerRepository.findByEmail(data.email);

    if (emailAlreadyExists) throw new AppError('This email already has a seller linked to it');

    const seller = await this.sellerRepository.create(data);

    return seller;
  }
}
