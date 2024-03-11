import { inject, injectable } from 'tsyringe';

import { VisitGrades } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IVisitGradesRepository from '../repositories/IVisitGradesRepository';

@injectable()
export default class DeleteVisitGradesService {
  constructor(
    @inject('VisitGradesRepository')
    private visitGradesRepository: IVisitGradesRepository,
  ) { }

  public async execute(id: string): Promise<VisitGrades> {
    const visitExists = await this.visitGradesRepository.findById(id);

    if (!visitExists) throw new AppError('A visitGrade with this Id does not exist');

    const seller = await this.visitGradesRepository.delete(id);

    return seller;
  }
}
