import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  image: string;
  name: string;
  email: string;
  companyId: string;
  managerId: string;
}

@injectable()
export default class CreateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute({
    image, email, name, companyId, managerId,
  }: IRequest): Promise<Supervisor> {
    const emailExists = await this.supervisorRepository.findByEmail(email);

    if (emailExists) throw new AppError('Supervisor with this email already exists');

    const user = this.supervisorRepository.create({
      image,
      name,
      email: email.toLowerCase(),
      companyId,
      managerId,
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
