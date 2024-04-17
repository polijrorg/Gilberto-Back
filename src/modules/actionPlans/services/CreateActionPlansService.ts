import { inject, injectable } from 'tsyringe';

import { ActionPlans } from '@prisma/client';

import IActionPlansRepository from '../repositories/IActionPlansRepository';
import ICreateActionPlansDTO from '../dtos/ICreateActionPlansDTO';

@injectable()
export default class CreateActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
  ) { }

  public async execute(data: ICreateActionPlansDTO): Promise<ActionPlans> {
    const seller = await this.actionPlansRepository.create(data);

    return seller;
  }
}
