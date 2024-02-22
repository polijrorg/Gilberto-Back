import { inject, injectable } from 'tsyringe';

import { Supervisor } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import ISupervisorRepository from '../repositories/ISupervisorRepository';

@injectable()
export default class GetAllSupervisorFromADirectorService {
  constructor(
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(directorId: string): Promise<Supervisor[] | null> {
    const managerExists = await this.directorRepository.findById(directorId);

    if (!managerExists) throw new AppError('A director with this Id does not exist');

    const supervisor = await this.supervisorRepository.getAllSupervisorFromADirector(directorId);

    return supervisor;
  }
}
