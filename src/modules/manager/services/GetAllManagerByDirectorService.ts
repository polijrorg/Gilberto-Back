import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import IManagerRepository from '../repositories/IManagerRepository';

@injectable()
export default class GetAllManagerByDirectorService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(directorId: string): Promise<Manager[] | null> {
    const seller = await this.managerRepository.getAllManagerByDirector(directorId);

    return seller;
  }
}
