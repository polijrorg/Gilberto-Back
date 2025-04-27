import { inject, injectable } from 'tsyringe';
import { VisitTemplate } from '@prisma/client';
import AppError from '@shared/errors/AppError';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class GetSelectedVisitByDirectorService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepo: IVisitTemplateRepository,

    @inject('DirectorRepository')
    private directorRepo: IDirectorRepository,
  ) {}

  public async execute(directorId: string): Promise<VisitTemplate | null> {
    const director = await this.directorRepo.findById(directorId);
    if (!director) {
      throw new AppError('A director with this Id does not exist', 404);
    }

    const selected = await this.visitTemplateRepo.getSelectedByDirector(
      directorId,
    );

    return selected ? selected[0] ?? null : null;
  }
}
