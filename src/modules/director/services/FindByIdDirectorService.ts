import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import IDirectorRepository from '../repositories/IDirectorRepository';

@injectable()
export default class FindByIdDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(id: string): Promise<Director | null> {
    const director = await this.directorRepository.findById(id);

    return director;
  }
}
