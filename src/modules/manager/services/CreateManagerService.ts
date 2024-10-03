import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IManagerRepository from '../repositories/IManagerRepository';
import ICreateManagerDTO from '../dtos/ICreateManagerDTO';
import IDirectorRepository from '../../director/repositories/IDirectorRepository';

@injectable()
export default class CreateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(data: ICreateManagerDTO): Promise<Manager> {
    const emailAlreadyExists = await this.managerRepository.findByEmail(data.email);

    if (emailAlreadyExists) throw new AppError('A manager with this email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const manager = await this.managerRepository.create(data);

    const director = manager?.directorId ? await this.directorRepository.findById(manager.directorId) : null;

    const templateDataFile = path.resolve(__dirname, '..', 'view', 'templateEmail.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: manager.name,
        email: manager.email,
      },
      subject: 'Criação de conta',
      templateData: {
        file: templateDataFile,
        variables: {
          name: manager.name, email: manager.email, password: data.password, upper: director?.name ?? '',
        },
      },
    });

    return manager;
  }
}
