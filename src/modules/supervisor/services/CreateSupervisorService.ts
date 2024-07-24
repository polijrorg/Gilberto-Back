/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import path from 'path';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ISupervisorRepository from '../repositories/ISupervisorRepository';
import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';

@injectable()
export default class CreateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(data: ICreateSupervisorDTO): Promise<Supervisor> {
    const emailExists = await this.supervisorRepository.findByEmail(data.email);

    if (emailExists) throw new AppError('Supervisor with this email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const user = await this.supervisorRepository.create({ ...data, password: hashedPassword });
    const manager = await this.managerRepository.findById(user.managerId!);
    const templateDataFile = path.resolve(__dirname, '..', 'view', 'templateEmail.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Criação de conta',
      templateData: {
        file: templateDataFile,
        variables: {
          name: user.name, email: user.email, password: data.password, upper: manager?.name ?? '',
        },
      },
    });

    return user;
  }
}
