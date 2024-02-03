import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '../repositories/ISellerRepository';

interface IRequest {
  image?: string
  name?: string;
  email?: string;
  supervisorId?: string;
}

@injectable()
export default class UpdateSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute(id: string, {
    image, email, name, supervisorId,
  }: IRequest): Promise<Seller> {
    const sellerExists = await this.sellerRepository.findById(id);

    if (!sellerExists) throw new AppError('No seller linked to this id');

    if (email) {
      const emailAlreadyExists = await this.sellerRepository.findByEmail(email);
      if (emailAlreadyExists) throw new AppError('This email already has a seller linked to it');
    }

    const seller = await this.sellerRepository.updateSeller(id, {
      image,
      name,
      email,
      supervisorId,
    });

    return seller;
  }
}
