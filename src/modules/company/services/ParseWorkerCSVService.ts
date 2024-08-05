import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '../repositories/ICompanyRepository';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';

interface ICompanyDoc {
  name: string;
}

@injectable()
export default class ParseCompanyCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,
  ) {}

  public async execute(file: Express.Multer.File | undefined): Promise<ICompanyDoc[]> {
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError('Invalid file. Please upload a CSV file.');
    }

    let entries: ICompanyDoc[] = [];

    try {
      entries = await this.csvProvider.parseDocument<ICompanyDoc>(file.filename, ['name']);
    } catch (error) {
      throw new AppError('Error parsing the CSV file. Please ensure it is formatted correctly.');
    }

    const failedEntries: ICompanyDoc[] = [];

    const promises = entries.map(async (entry) => {
      try {
        if (!entry.name) {
          console.log('Skipping entry due to missing fields:', entry);
          failedEntries.push(entry);
          return;
        }

        const companyName = entry.name;

        const nameAlreadyExists = await this.companyRepository.findByName(companyName);
        if (nameAlreadyExists) {
          console.log('Name already exists:', companyName);
          failedEntries.push(entry);
          return;
        }

        const company: ICreateCompanyDTO = {
          name: companyName,
        };

        await this.companyRepository.create(company);
      } catch (error) {
        console.log('Error processing entry:', entry, 'Error:', error.message);
        failedEntries.push(entry);
      }
    });

    try {
      await Promise.all(promises);

      if (failedEntries.length > 0) {
        throw new AppError(`Failed to add the following companies: ${failedEntries.map((entry) => entry.name).join(', ')}`, 400);
      }

      return entries;
    } catch (error) {
      throw new AppError(`Error processing the CSV file: ${error.message}`, 400);
    }
  }
}
