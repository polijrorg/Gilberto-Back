import { inject, injectable } from 'tsyringe';
import path from 'path';

import { ActionPlans } from '@prisma/client';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IActionPlansRepository from '../repositories/IActionPlansRepository';
import ICreateActionPlansDTO from '../dtos/ICreateActionPlansDTO';

@injectable()
export default class CreateActionPlansService {
  constructor(
    @inject('ActionPlansRepository')
    private actionPlansRepository: IActionPlansRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(data: ICreateActionPlansDTO): Promise<ActionPlans & { seller: { email: string, name: string }, supervisor: { name: string } }> {
    const actionPlan = await this.actionPlansRepository.create(data);
    const templateDataFile = path.resolve(__dirname, '..', 'views', 'createActionPlan.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: actionPlan.seller.name,
        email: 'pedrogomes18@usp.br', // actionPlan.seller.email
      },
      subject: 'Plano de Ação',
      templateData: {
        file: templateDataFile,
        variables: {
          nameSeller: actionPlan.seller.name,
          nameSupervisor: actionPlan.supervisor.name,
          title: actionPlan.title,
          comments: actionPlan.comments,
          prize: actionPlan.prize,
        },
      },
    });

    return actionPlan;
  }
}
