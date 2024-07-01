import { container } from 'tsyringe';

// import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';
import MailjetProvider from './implementations/MailjetProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  mailjet: container.resolve(MailjetProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers.mailjet);
