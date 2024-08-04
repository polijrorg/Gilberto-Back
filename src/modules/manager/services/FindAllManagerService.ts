import { inject, injectable } from 'tsyringe';

import { Manager, Company, Director } from '@prisma/client';

import IManagerRepository from '../repositories/IManagerRepository';

@injectable()
export default class FindAllManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute(): Promise<(Manager & {company: Company, director: Director})[] | null> {
    const manager = await this.managerRepository.findAll();

    return manager;
  }
}
