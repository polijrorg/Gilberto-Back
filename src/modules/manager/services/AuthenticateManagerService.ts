import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IManagerRepository from '../repositories/IManagerRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<{ user: Manager, token: string }> {
    const user = await this.managerRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password', 401);
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
