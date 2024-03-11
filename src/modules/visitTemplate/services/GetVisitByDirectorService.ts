import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetVisitByDirectorService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,
  ) { }

  public async execute(directorId: string): Promise<VisitTemplate[] | null> {
    const sellerExists = await this.directorRepository.findById(directorId);

    if (!sellerExists) throw new AppError('A director with this Id does not exist');

    const seller = await this.visitTemplateRepository.getByDirector(directorId);

    return seller;
  }
}
