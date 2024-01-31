import { inject, injectable } from 'tsyringe';

// import path from 'path';

import { Supervisor } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  image: string;
  name: string;
  email: string;
}

@injectable()
export default class CreateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute({
    image, email, name,
  }: IRequest): Promise<Supervisor> {
    const user = this.supervisorRepository.create({
      image,
      name,
      email: email.toLowerCase(),
    });

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
