import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IManagerRepository from '../repositories/IManagerRepository';
import ICreateManagerDTO from '../dtos/ICreateManagerDTO';

@injectable()
export default class CreateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateManagerDTO): Promise<Manager> {
    const emailAlreadyExists = await this.managerRepository.findByEmail(data.email);

    if (emailAlreadyExists) throw new AppError('A manager with this email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const seller = await this.managerRepository.create(data);

    return seller;
  }
}
