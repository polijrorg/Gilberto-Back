import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  id: string;
  newName: string;
}

@injectable()
export default class UpdateSupervisorNameService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute({ id, newName } : IRequest): Promise<Supervisor> {
    const supervisor = this.supervisorRepository.updateName(id, newName);

    return supervisor;
  }
}
