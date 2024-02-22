import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IDirectorRepository from '../repositories/IDirectorRepository';

@injectable()
export default class DeleteDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(id: string): Promise<Director> {
    const sellerExists = await this.directorRepository.findById(id);

    if (!sellerExists) throw new AppError('This id does not exist');

    const seller = await this.directorRepository.delete(id);

    return seller;
  }
}
