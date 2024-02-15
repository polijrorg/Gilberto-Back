import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ISupervisorRepository from '../repositories/ISupervisorRepository';
import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';

@injectable()
export default class CreateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(data: ICreateSupervisorDTO): Promise<Supervisor> {
    const emailExists = await this.supervisorRepository.findByEmail(data.email);

    if (emailExists) throw new AppError('Supervisor with this email already exists');

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    // eslint-disable-next-line no-param-reassign
    data.password = hashedPassword;

    const user = await this.supervisorRepository.create(data);

    /*  const templateDataFile = path.resolve(__dirname, '..', 'views', 'create_account.hbs');

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      subject: 'Criação de conta',
      templateData: {
        file: templateDataFile,
        variables: { name },
      },
    }); */

    return user;
  }
}
