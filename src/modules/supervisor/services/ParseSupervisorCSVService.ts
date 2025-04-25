/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import ICreateSupervisorDTO from '../dtos/ICreateSupervisorDTO';
import ISupervisorRepository from '../repositories/ISupervisorRepository';

interface ICsvSupervisor {
  name: string;
  email: string;
  password: string;
  companyName: string;
  managerEmail?: string;
}

interface IFailedEntry {
  entry: ICsvSupervisor;
  reason: string;
}

@injectable()
export default class ParseSupervisorCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('ManagerRepository')
    private managerRepository: IManagerRepository,

    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(file: Express.Multer.File | undefined): Promise<ICsvSupervisor[]> {
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError('Invalid file. Please upload a CSV file.');
    }

    let entries: ICsvSupervisor[] = [];

    try {
      entries = await this.csvProvider.parseDocument<ICsvSupervisor>(file.filename, ['name', 'email', 'password', 'companyName', 'managerEmail'], true);
    } catch (error) {
      throw new AppError('Error parsing the CSV file. Please ensure it is formatted correctly.');
    }

    const failedEntries: IFailedEntry[] = [];

    const promises = entries.map(async (entry) => {
      try {
        if (!entry.name || !entry.email || !entry.companyName || !entry.managerEmail) {
          console.log('Skipping entry due to missing fields:', entry);
          failedEntries.push({ entry, reason: 'Algum Campo Vazio' });
          return;
        }

        const {
          name, email, companyName, managerEmail, password,
        } = entry;

        const companyWithName = await this.companyRepository.findByName(companyName);
        if (!companyWithName) {
          console.log('No company with name ', companyName);
          failedEntries.push({ entry, reason: `Empresa ${companyName} não encontrada` });
          return;
        }

        let managerWithEmail;
        if (managerEmail) {
          managerWithEmail = await this.managerRepository.findByEmail(managerEmail);
          if (!managerWithEmail) {
            console.log('Manager email doesn\'t exists:', managerEmail);
            failedEntries.push({ entry, reason: 'Email do gerente não registrado' });
            return;
          }
        }
        const supervisorWithEmail = await this.supervisorRepository.findByEmail(email);
        if (supervisorWithEmail) {
          console.log('Email already registered:', email);
          failedEntries.push({ entry, reason: 'Email do supervisor já registrado' });
          return;
        }

        const supervisor: ICreateSupervisorDTO = {
          companyId: companyWithName.id,
          managerId: managerWithEmail?.id,
          email,
          image: '', // Não está sendo utilizado
          name,
          password: await this.hashProvider.generateHash(password),
        };

        await this.supervisorRepository.create(supervisor);

        const templateDataFile = path.resolve(__dirname, '..', 'view', 'templateEmail.hbs');

        await this.mailProvider.sendMail({
          to: {
            name: supervisor.name,
            email: supervisor.email,
          },
          subject: 'Criação de conta',
          templateData: {
            file: templateDataFile,
            variables: {
              name: supervisor.name, email: supervisor.email, password: supervisor.password, upper: managerEmail ?? '',
            },
          },
        });
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
