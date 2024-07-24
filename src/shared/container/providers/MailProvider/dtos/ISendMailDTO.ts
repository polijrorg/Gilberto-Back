import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IContact;
  from?: IContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
  base64PDF?: string;
}

export default ISendMailDTO;
