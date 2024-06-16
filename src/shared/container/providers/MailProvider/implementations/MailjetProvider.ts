import mailProvider, { Client } from 'node-mailjet';

import { inject, injectable } from 'tsyringe';

import mailConfig from '@config/mail';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class MailjetMailProvider implements IMailProvider {
  private client: Client;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const mailjet = mailProvider.apiConnect(
      mailConfig.mailjet_api_key,
      mailConfig.mailjet_secret_key,
    );

    this.client = mailjet; // esse vai ser no nome do nosso Mail_Driver
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    const html = await this.mailTemplateProvider.parse(templateData);

    await this.client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: from?.email || email,
            Name: from?.name || name,
          },
          To: [
            {
              Email: to?.email,
              Name: to?.name,
            },
          ],
          Subject: subject,
          TemplateLanguage: true,
          HTMLPart: html,
          Variables: {
            name: templateData.variables.name,
            token: templateData.variables.token,
          },
        },
      ],
    });
  }
}
