import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '../repositories/ISellerRepository';

interface IRequest {
  image: string
  name: string;
  email: string;
  supervisorId: string;
  companyId: string;
}

@injectable()
export default class CreateSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute({
    image, email, name, supervisorId, companyId,
  }: IRequest): Promise<Seller> {
    const emailAlreadyExists = await this.sellerRepository.findByEmail(email);

    if (emailAlreadyExists) throw new AppError('This email already has a seller linked to it');

    const seller = await this.sellerRepository.create({
      image,
      name,
      email: email.toLowerCase(),
      supervisorId,
      companyId,
    });

    return seller;
  }
}
