import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import IDirectorRepository from '../repositories/IDirectorRepository';

@injectable()
export default class GetAllDirectorByCompanyService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(companyId: string): Promise<Director[] | null> {
    const seller = await this.directorRepository.getAllDirectorByCompany(companyId);

    return seller;
  }
}
