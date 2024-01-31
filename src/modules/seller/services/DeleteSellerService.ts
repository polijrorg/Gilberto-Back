import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISellerRepository from '../repositories/ISellerRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteSellerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Seller> {
    const sellerExists = await this.sellerRepository.findById(id);

    if (!sellerExists) throw new AppError('This seller does not exist');

    const seller = await this.sellerRepository.delete(id);

    return seller;
  }
}
