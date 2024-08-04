import { inject, injectable } from 'tsyringe';

import { Supervisor, Manager } from '@prisma/client';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisorFromCompanyService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(supervisorId: string): Promise<(Supervisor & { manager: Manager}) | null> {
    const supervisor = await this.supervisorRepository.findById(supervisorId);

    return supervisor;
  }
}
