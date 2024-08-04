import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisor {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(): Promise<Supervisor[] | null> {
    const supervisor = await this.supervisorRepository.findAll();

    return supervisor;
  }
}
