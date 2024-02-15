import { inject, injectable } from 'tsyringe';

import { Seller } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromASupervisorService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(supervisorId: string): Promise<Seller[] | null> {
    const supervisorExists = await this.supervisorRepository.findById(supervisorId);

    if (!supervisorExists) throw new AppError('A supervisor with this Id does not exist');

    const seller = await this.sellerRepository.getAllSellerFromASupervisor(supervisorId);

    return seller;
  }
}
