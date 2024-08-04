import { inject, injectable } from 'tsyringe';

import { Director } from '@prisma/client';

import IDirectorRepository from '../repositories/IDirectorRepository';

@injectable()
export default class FindAllDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(): Promise<Director[]> {
    const director = await this.directorRepository.findAll();

    return director;
  }
}
