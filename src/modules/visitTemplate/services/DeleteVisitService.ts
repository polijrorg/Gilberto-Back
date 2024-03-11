import { inject, injectable } from 'tsyringe';

import { VisitTemplate } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitTemplateRepository from '../repositories/IVisitTemplateRepository';

@injectable()
export default class DeleteVisitTemplateService {
  constructor(
    @inject('VisitTemplateRepository')
    private visitTemplateRepository: IVisitTemplateRepository,
  ) { }

  public async execute(id: string): Promise<VisitTemplate> {
    const visitExists = await this.visitTemplateRepository.findById(id);

    if (!visitExists) throw new AppError('A visit template with this Id does not exist');

    const seller = await this.visitTemplateRepository.delete(id);

    return seller;
  }
}
