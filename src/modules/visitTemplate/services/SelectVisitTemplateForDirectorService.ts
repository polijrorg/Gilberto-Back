import { inject, injectable } from 'tsyringe';
import { Director } from '@prisma/client';

import AppError from '@shared/errors/AppError';
import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IVisitTemplateRepository
  from '../repositories/IVisitTemplateRepository';

interface IRequest {
  directorId: string;
  templateId: string;
}

@injectable()
export default class SelectVisitTemplateForDirectorService {
  constructor(
    @inject('DirectorRepository')
    private directorRepo: IDirectorRepository,

    @inject('VisitTemplateRepository')
    private vtRepo: IVisitTemplateRepository,
  ) {}

  public async execute({ directorId, templateId }: IRequest): Promise<Director> {
    const director = await this.directorRepo.findById(directorId);
    if (!director) {
      throw new AppError('Director not found', 404);
    }

    const template = await this.vtRepo.findById(templateId);
    if (!template || template.directorId !== directorId) {
      throw new AppError(
        'VisitTemplate not found or does not belong to this director',
        400,
      );
    }

    const updated = await this.directorRepo.update(directorId, { selectedVisitTemplateId: templateId });

    return updated;
  }
}
