import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IVisitTemplateRepository from '@modules/visitTemplate/repositories/IVisitTemplateRepository';
import IDirectorRepository from '../repositories/IDirectorRepository';
import IUpdateDirectorDTO from '../dtos/IUpdateDirectorDTO';

@injectable()
export default class UpdateDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('VisitTemplateRepository')
    private vtRepo: IVisitTemplateRepository,
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

    if (data.selectedVisitTemplateId) {
      const selectedVisitTemplateId = await this.vtRepo.findById(data.selectedVisitTemplateId);

      if (!selectedVisitTemplateId) throw new AppError('This selectedVisitTemplate does not exist');
    }

    const seller = await this.directorRepository.update(id, data);

    return seller;
  }
}
