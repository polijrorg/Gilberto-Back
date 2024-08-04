import { inject, injectable } from 'tsyringe';

import { Supervisor, Manager, Company } from '@prisma/client';

import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisor {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
  ) { }

  public async execute(): Promise<(Supervisor & {manager: Manager, company: Company})[] > {
    const supervisors = await this.supervisorRepository.findAll();
    const supervisorsWithManagerAndCompany = supervisors.map((supervisor) => ({
      ...supervisor,
      manager: supervisor.manager,
      company: supervisor.company,
    }));

    return supervisorsWithManagerAndCompany;
  }
}
