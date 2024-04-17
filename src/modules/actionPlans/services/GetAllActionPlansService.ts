import { inject, injectable } from 'tsyringe';

import { ActionPlans } from '@prisma/client';

import IActionPlansRepository from '../repositories/IActionPlansRepository';

@injectable()
export default class GetAllActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
  ) { }

  public async execute(): Promise<ActionPlans[] | null> {
    const seller = await this.actionPlansRepository.getAll();

    return seller;
  }
}
