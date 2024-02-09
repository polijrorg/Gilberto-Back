import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IManagerRepository from '../repositories/IManagerRepository';
import IUpdateManagerDTO from '../dtos/IUpdateManagerDTO';

@injectable()
export default class UpdateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string, data: IUpdateManagerDTO): Promise<Manager> {
    if (data.email) {
      const emailAlreadyExists = await this.managerRepository.findByEmail(data.email);

      if (emailAlreadyExists) throw new AppError('A manager with this email already exists');
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(data.password);

      // eslint-disable-next-line no-param-reassign
      data.password = hashedPassword;
    }
    const seller = await this.managerRepository.update(id, data);

    return seller;
  }
}
