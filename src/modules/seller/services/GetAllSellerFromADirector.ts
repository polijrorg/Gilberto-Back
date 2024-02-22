import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromADirectorService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(directorId: string): Promise<Seller[] | null> {
    const managerExists = await this.directorRepository.findById(directorId);

    if (!managerExists) throw new AppError('A director with this Id does not exist');

    const seller = await this.sellerRepository.getAllSellerFromADirector(directorId);

    return seller;
  }
}
