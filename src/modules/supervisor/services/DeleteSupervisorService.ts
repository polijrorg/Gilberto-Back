import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

// import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteSupervisorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute({ id }: IRequest): Promise<Supervisor> {
    const supervisor = await this.supervisorRepository.delete(id);

    return supervisor;
  }
}
