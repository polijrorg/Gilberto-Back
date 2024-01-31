import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<{ user: Supervisor, token: string }> {
    const user = await this.supervisorRepository.findByEmailWithRelations(email);

    if (!user) {
      throw new AppError('Incorrect token', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
