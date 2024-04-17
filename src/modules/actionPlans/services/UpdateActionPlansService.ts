import { inject, injectable } from 'tsyringe';

import { ActionPlans } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IActionPlansRepository from '../repositories/IActionPlansRepository';
import IUpdateActionPlansDTO from '../dtos/IUpdateActionPlansDTO';

@injectable()
export default class UpdateActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
  ) { }

  public async execute(id: string, data: IUpdateActionPlansDTO): Promise<ActionPlans> {
    const ActionPlansExists = await this.actionPlansRepository.findById(id);

    if (!ActionPlansExists) throw new AppError('An Action Plan with this id does not exist');

    const seller = await this.actionPlansRepository.update(id, data);

    return seller;
  }
}
