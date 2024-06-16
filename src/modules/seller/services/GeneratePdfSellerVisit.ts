import { inject, injectable } from 'tsyringe';

import IPDFProvider from '@shared/container/providers/PDFProvider/models/IPDFProvider';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import pdf_template from '../views/GenerateSellerVisit';
import ISellerRepository from '../repositories/ISellerRepository';

@injectable()
export default class GetAllSellerFromACompanyService {
  constructor(
    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
    @inject('PDFProvider')
    private pdfProvider: IPDFProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute(id: string, day: string): Promise<string> {
    const visitExists = await this.sellerRepository.findByIdAndData(id, day);

    if (!visitExists) throw new AppError('On this day, this seller not visited no one');

    const filepathPDF = this.pdfProvider.createPDFtoFile(pdf_template({ sellerVisits: visitExists, day }), id.substring(0, 5) + new Date().);

    await this.mailProvider.sendMail({
      to: {
        name: 'Gilbas',
        email: 'brunomarcianosantos@usp.br',
      },
      subject: 'Teste',
      templateData: {
        file: templateDataFile,
        variables: { name, confirmationToken },
      },
    });

    return filepathPDF;
  }
}
