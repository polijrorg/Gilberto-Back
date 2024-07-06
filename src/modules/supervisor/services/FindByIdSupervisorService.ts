import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisorFromCompanyService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(supervisorId: string): Promise<Supervisor | null> {
    const supervisor = await this.supervisorRepository.findById(supervisorId);

    return supervisor;
  }
}
