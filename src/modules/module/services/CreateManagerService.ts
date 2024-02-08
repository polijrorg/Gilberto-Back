import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '../repositories/IManagerRepository';

interface IRequest {
  image: string
  name: string;
  email: string;
  companyId: string;
}

@injectable()
export default class CreateManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute({
    image, name, email, companyId,
  }: IRequest): Promise<Manager> {
    const emailAlreadyExists = await this.managerRepository.findByEmail(email);

    if (emailAlreadyExists) throw new AppError('A manager with this email already exists');

    const seller = await this.managerRepository.create({
      image,
      name,
      email,
      companyId,
    });

    return seller;
  }
}
