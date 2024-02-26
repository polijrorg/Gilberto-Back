import { inject, injectable } from 'tsyringe';

import { Visit } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitRepository from '../repositories/IVisitRepository';

@injectable()
export default class DeleteVisitService {
  constructor(
    @inject('VisitRepository')
    private visitRepository: IVisitRepository,
  ) { }

  public async execute(id: string): Promise<Visit> {
    const visitExists = await this.visitRepository.findById(id);

    if (!visitExists) throw new AppError('A visit with this Id does not exist');

    const seller = await this.visitRepository.delete(id);

    return seller;
  }
}
