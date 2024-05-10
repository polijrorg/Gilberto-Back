import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '../repositories/ISellerRepository';
import IUpdateSellerDTO from '../dtos/IUpdateSellerDTO';

@injectable()
export default class UpdateSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(id: string, data: IUpdateSellerDTO): Promise<Seller> {
    const sellerExists = await this.sellerRepository.findById(id);

    if (!sellerExists) throw new AppError('No seller linked to this id');

    if (data.email) {
      const emailAlreadyExists = await this.sellerRepository.findByEmail(data.email);
      if (emailAlreadyExists) throw new AppError('This email already has a seller linked to it');
    }

    const seller = await this.sellerRepository.updateSeller(id, data);

    return seller;
  }
}
