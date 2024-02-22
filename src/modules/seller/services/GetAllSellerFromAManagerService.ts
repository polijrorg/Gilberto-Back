import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromAManagerService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(managerId: string): Promise<Seller[] | null> {
    const managerExists = await this.managerRepository.findById(managerId);

    if (!managerExists) throw new AppError('A manager with this Id does not exist');

    const seller = await this.sellerRepository.getAllSellerFromASupervisor(managerId);

    return seller;
  }
}
