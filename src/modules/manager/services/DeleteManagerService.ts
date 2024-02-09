import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '../repositories/IManagerRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Manager> {
    const sellerExists = await this.managerRepository.findById(id);

    if (!sellerExists) throw new AppError('This id does not exist');

    const seller = await this.managerRepository.delete(id);

    return seller;
  }
}
