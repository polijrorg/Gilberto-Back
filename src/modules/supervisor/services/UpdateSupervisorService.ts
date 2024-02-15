import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ISupervisorRepository from '../repositories/ISupervisorRepository';
import IUpdateSupervisorDTO from '../dtos/IUpdateSupervisorDTO';

@injectable()
export default class UpdateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute(id: string, data: IUpdateSupervisorDTO): Promise<Supervisor> {
    const supervisorExists = await this.supervisorRepository.findById(id);

    if (!supervisorExists) throw new AppError('A supervisor with this Id does not exist');

    if (data.email) {
      const emailExists = await this.supervisorRepository.findByEmail(data.email);

      if (emailExists) throw new AppError('Supervisor with this email already exists');
    }

    if (data.password) {
      const hashedPassword = await this.hashProvider.generateHash(data.password);

      // eslint-disable-next-line no-param-reassign
      data.password = hashedPassword;
    }
    const supervisor = await this.supervisorRepository.update(id, data);

    return supervisor;
  }
}
