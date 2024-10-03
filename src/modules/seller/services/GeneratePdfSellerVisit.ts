import { inject, injectable } from 'tsyringe';

import path from 'path';

import IPDFProvider from '@shared/container/providers/PDFProvider/models/IPDFProvider';

import AppError from '@shared/errors/AppError';

import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import pdf_template from '../views/GenerateSellerVisit';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromACompanyService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,
    @inject('PDFProvider')
    private pdfProvider: IPDFProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(id: string, day: string): Promise<string> {
    const visitExists = await this.sellerRepository.findByIdAndData(id, day);

    if (!visitExists) throw new AppError('On this day, this seller not visited no one');

    const supervisor = await this.supervisorRepository.findById(visitExists.supervisorId);

    if (!supervisor) throw new AppError('No supervisor on this seller');

    const templateDataFile = path.resolve(__dirname, '..', 'views', 'templateDataFile.hbs');
    const templateDataFileSupervisor = path.resolve(__dirname, '..', 'views', 'templateDataFileSupervisor.hbs');

    const base64PDF = await this.pdfProvider.createPDFtoBase64(pdf_template({ sellerVisits: visitExists, day }));

    await this.mailProvider.sendMail({
      to: {
        name: visitExists.name,
        email: visitExists.email,
      },
      subject: 'Relatório de Visita',
      templateData: {
        file: templateDataFile,
        variables: { nameSeller: visitExists.name, nameSupervisor: supervisor.name, day },
      },
      base64PDF,
    });

    await this.mailProvider.sendMail({
      to: {
        name: supervisor.name,
        email: supervisor.email,
      },
      subject: 'Relatório de Visita',
      templateData: {
        file: templateDataFileSupervisor,
        variables: {
          nameSeller: visitExists.name, day, nameSupervisor: supervisor.name,
        },
      },
      base64PDF,
    });

    return base64PDF;
  }
}
