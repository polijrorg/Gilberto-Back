import { injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class AuthenticateDirectorService {
  public async execute({ email, password }: IRequest): Promise<{ token: string }> {
    if (!(email === process.env.ADMINUSER)) {
      throw new AppError('Incorrect email', 401);
    }

    if (!(password === process.env.ADMINPASSWORD)) {
      throw new AppError('Incorrect password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: process.env.ADMINUSER,
      expiresIn,
    });

    return {
      token,
    };
  }
}
