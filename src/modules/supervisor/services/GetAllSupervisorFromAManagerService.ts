import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisorFromAManagerService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(managerId: string): Promise<Supervisor[] | null> {
    const managerExists = await this.managerRepository.findById(managerId);

    if (!managerExists) throw new AppError('A manager with this Id does not exist');

    const supervisor = await this.supervisorRepository.getAllSupervidorFromAManager(managerId);

    return supervisor;
  }
}
