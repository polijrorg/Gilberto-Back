/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICreateDirectorDTO from '../dtos/ICreateDirectorDTO';
import IDirectorRepository from '../repositories/IDirectorRepository';

interface ICsvDirector {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

interface IFailedEntry {
  entry: ICsvDirector;
  reason: string;
}

@injectable()
export default class ParseDirectorCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(file: Express.Multer.File | undefined): Promise<ICsvDirector[]> {
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError('Invalid file. Please upload a CSV file.');
    }

    let entries: ICsvDirector[] = [];

    try {
      entries = await this.csvProvider.parseDocument<ICsvDirector>(file.filename, ['name', 'email', 'companyName', 'password'], true);
    } catch (error) {
      throw new AppError('Error parsing the CSV file. Please ensure it is formatted correctly.');
    }

    const failedEntries: IFailedEntry[] = [];

    const promises = entries.map(async (entry) => {
      try {
        if (!entry.name || !entry.email || !entry.companyName) {
          console.log('Skipping entry due to missing fields:', entry);
          failedEntries.push({ entry, reason: 'Algum Campo Vazio' });
          return;
        }

        const {
          email, name, companyName, password,
        } = entry;

        const companyWithName = await this.companyRepository.findByName(companyName);
        if (!companyWithName) {
          console.log('No company with name ', companyName);
          failedEntries.push({ entry, reason: `Empresa ${companyName} não encontrada` });
          return;
        }

        const directorWithEmail = await this.directorRepository.findByEmail(email);
        if (directorWithEmail) {
          console.log('Email already exists:', email);
          failedEntries.push({ entry, reason: 'Email já existe' });
          return;
        }

        const director: ICreateDirectorDTO = {
          companyId: companyWithName.id,
          email,
          image: '', // Não está sendo utilizado
          name,
          password: await this.hashProvider.generateHash(password),
        };

        await this.directorRepository.create(director);
      } catch (error: any) {
        console.log('Error processing entry:', entry, 'Error:', error.message);
        failedEntries.push({ entry, reason: `Erro desconechido com a seguinte mensagem: ${error.message}` });
      }
    });

    try {
      await Promise.all(promises);

      if (failedEntries.length > 0) {
        throw new AppError(`Falha em adicionar as seguintes empresas: \n${failedEntries.map((failed) => ` - ${failed.entry.email}: ${failed.reason}`).join(',\n')}`, 400);
      }

      return entries;
    } catch (error: any) {
      throw new AppError(`Erro ao ler o CSV: ${error.message}`, 400);
    }
  }
}
