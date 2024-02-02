import { inject, injectable } from 'tsyringe';

import { Manager } from '@prisma/client';

import IManagerRepository from '../repositories/IManagerRepository';

interface IRequest {
  companyId: string;
}

@injectable()
export default class GetAllManagerByCompanyService {
  constructor(
    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Manager[] | null> {
    const seller = await this.managerRepository.getAllManagerByCompany(companyId);

    return seller;
  }
}
