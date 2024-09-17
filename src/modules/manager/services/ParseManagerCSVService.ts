import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICreateManagerDTO from '../dtos/ICreateManagerDTO';
import IManagerRepository from '../repositories/IManagerRepository';

interface ICsvManager {
  name: string;
  email: string;
  companyName: string;
  directorEmail?: string;
}

interface IFailedEntry {
  entry: ICsvManager;
  reason: string;
}

@injectable()
export default class ParseManagerCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('DirectorRepository')
    private directorRepository: IDirectorRepository,

    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(file: Express.Multer.File | undefined): Promise<ICsvManager[]> {
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError('Invalid file. Please upload a CSV file.');
    }

    let entries: ICsvManager[] = [];

    try {
      entries = await this.csvProvider.parseDocument<ICsvManager>(file.filename, ['name', 'email', 'companyName', 'directorEmail'], true);
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
          email, name, companyName, directorEmail,
        } = entry;

        const companyWithName = await this.companyRepository.findByName(companyName);
        if (!companyWithName) {
          console.log('No company with name ', companyName);
          failedEntries.push({ entry, reason: `Empresa ${companyName} não encontrada` });
          return;
        }

        let directorWithEmail;
        if (directorEmail) {
          directorWithEmail = await this.directorRepository.findByEmail(directorEmail);
          if (!directorWithEmail) {
            console.log('Director email doesn\'t exists:', directorEmail);
            failedEntries.push({ entry, reason: 'Email do diretor não registrado' });
            return;
          }
        }
        const managerWithEmail = await this.managerRepository.findByEmail(email);
        if (managerWithEmail) {
          console.log('Email already registered:', email);
          failedEntries.push({ entry, reason: 'Email já registrado' });
          return;
        }

        const password = this.makePassword(8);

        const manager: ICreateManagerDTO = {
          companyId: companyWithName.id,
          directorId: directorWithEmail?.id,
          email,
          image: '', // Não está sendo utilizado
          name,
          password: await this.hashProvider.generateHash(password),
        };

        await this.managerRepository.create(manager);
      } catch (error) {
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
    } catch (error) {
      throw new AppError(`Erro ao ler o CSV: ${error.message}`, 400);
    }
  }

  private makePassword(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
