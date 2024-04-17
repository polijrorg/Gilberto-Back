import { inject, injectable } from 'tsyringe';

import { ActionPlans } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IActionPlansRepository from '../repositories/IActionPlansRepository';

@injectable()
export default class DeleteActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
  ) { }

  public async execute(id: string): Promise<ActionPlans> {
    const idExists = await this.actionPlansRepository.findById(id);

    if (!idExists) throw new AppError('An Action Plan with this id does not exist');

    const seller = await this.actionPlansRepository.delete(id);

    return seller;
  }
}
