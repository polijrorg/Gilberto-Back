import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '../repositories/IManagerRepository';
import ICreateManagerDTO from '../dtos/ICreateManagerDTO';

@injectable()
export default class CreateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(data: ICreateManagerDTO): Promise<Manager> {
    const emailAlreadyExists = await this.managerRepository.findByEmail(data.email);

    if (emailAlreadyExists) throw new AppError('A manager with this email already exists');

    const seller = await this.managerRepository.create(data);

    return seller;
  }
}
