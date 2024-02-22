import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IDirectorRepository from '../repositories/IDirectorRepository';
import IUpdateDirectorDTO from '../dtos/IUpdateDirectorDTO';

@injectable()
export default class UpdateDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string, data: IUpdateDirectorDTO): Promise<Director> {
    if (data.email) {
      const emailAlreadyExists = await this.directorRepository.findByEmail(data.email);

      if (emailAlreadyExists) throw new AppError('A Director with this email already exists');
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(data.password);

      // eslint-disable-next-line no-param-reassign
      data.password = hashedPassword;
    }
    const seller = await this.directorRepository.update(id, data);

    return seller;
  }
}
