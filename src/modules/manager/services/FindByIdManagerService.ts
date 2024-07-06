import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import IManagerRepository from '../repositories/IManagerRepository';

interface IRequest {
  managerId: string;
}

@injectable()
export default class FindByIdManagerService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute({ managerId }: IRequest): Promise<Manager | null> {
    const manager = await this.managerRepository.findById(managerId);

    return manager;
  }
}
