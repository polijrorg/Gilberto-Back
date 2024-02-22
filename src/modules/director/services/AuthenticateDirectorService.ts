import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { Director } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IDirectorRepository from '../repositories/IDirectorRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<{ user: Director, token: string }> {
    const user = await this.directorRepository.findByEmail(email);

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
