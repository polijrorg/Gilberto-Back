/* eslint-disable consistent-return */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '../repositories/ICompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

interface ICompanyDoc {
  'Image': string;
  'Name': string;
  'Stage': string;
}

@injectable()
export default class ParseCompanyCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,
  ) { }

  public async execute(file: Express.Multer.File | undefined): Promise<ICompanyDoc[]> {
    if (!file || file.mimetype !== 'text/csv') { throw new AppError('Invalid file'); }

    let entries;

    try {
      entries = await this.csvProvider.parseDocument<ICompanyDoc>(file.filename, ['Image', 'Name', 'Stage']);
    } catch (e) {
      throw new AppError('Invalid file');
    }

    const failedEntries: ICompanyDoc[] = [];

    const promises = entries.map(async (entry) => {
      try {
        const companyName = entry.Name;

        const nameAlreadyExists = await this.companyRepository.findByName(companyName);
        if (nameAlreadyExists) {
          failedEntries.push(entry);
          return undefined;
        }

        const company: ICreateCompanyDTO = {
          image: entry.Image,
          name: companyName,
          stage: entry.Stage || 'Estágio inicial',
        };

        await this.companyRepository.create(company);
      } catch (e) {
        failedEntries.push(entry);
        return undefined;
      }
    });

    try {
      await Promise.all(promises);

      if (failedEntries && failedEntries.length > 0) throw new Error();

      return entries;
    } catch (error) {
      throw new AppError(`Failed to add the following companies: ${failedEntries.map((entry) => entry.Name).join(', ')}`, 400);
    }
  }
}
