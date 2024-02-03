import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  image?: string;
  name?: string;
  email?: string;
  companyId?: string;
  managerId?: string;
}

@injectable()
export default class UpdateSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(id: string, {
    image, email, name, companyId, managerId,
  } : IRequest): Promise<Supervisor> {
    const emailExists = await this.supervisorRepository.findByEmail(email);

    if (emailExists) throw new AppError('Supervisor with this email already exists');
    const supervisor = this.supervisorRepository.update(id, {
      image, email, name, companyId, managerId,
    });

    return supervisor;
  }
}
