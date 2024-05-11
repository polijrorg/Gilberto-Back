import { inject, injectable } from 'tsyringe';

import { ActionPlans } from '@prisma/client';

import IActionPlansRepository from '../repositories/IActionPlansRepository';

interface IRequest {
  idSeller: string;
}

@injectable()
export default class GetAllActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
  ) { }

  public async execute({idSeller}: IRequest): Promise<ActionPlans[] | null> {
    const seller = await this.actionPlansRepository.getByIdSeller(idSeller);

    return seller;
  }
}
