import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class DeleteSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(): Promise<Supervisor[] | null> {
    const supervisor = this.supervisorRepository.getAll();

    return supervisor;
  }
}
