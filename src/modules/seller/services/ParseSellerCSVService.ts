/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICSVProvider from '@shared/container/providers/CSVProvider/models/ICsvProvider';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';
import { Stage } from '@prisma/client';
import ICreateSellerDTO from '../dtos/ICreateSellerDTO';
import ISellerRepository from '../repositories/ISellerRepository';

interface ICsvSeller {
  name: string;
  email: string;
  companyName: string;
  supervisorEmail: string;
  stage?: 'Visita' | 'Mentoria' | 'Pendente';
}

interface IFailedEntry {
  entry: ICsvSeller;
  reason: string;
}

@injectable()
export default class ParseSellerCSVService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('SupervisorRepository')
    private supervisorRepository: ISupervisorRepository,

    @inject('SellerRepository')
    private sellerRepository: ISellerRepository,

    @inject('CSVProvider')
    private csvProvider: ICSVProvider,
  ) {}

  public async execute(file: Express.Multer.File | undefined): Promise<ICsvSeller[]> {
    if (!file || file.mimetype !== 'text/csv') {
      throw new AppError('Invalid file. Please upload a CSV file.');
    }

    let entries: ICsvSeller[] = [];

    try {
      entries = await this.csvProvider.parseDocument<ICsvSeller>(file.filename, ['name', 'email', 'companyName', 'supervisorEmail', 'stage'], true);
    } catch (error) {
      throw new AppError('Error parsing the CSV file. Please ensure it is formatted correctly.');
    }

    const failedEntries: IFailedEntry[] = [];

    const promises = entries.map(async (entry) => {
      try {
        if (!entry.name || !entry.email || !entry.companyName || !entry.supervisorEmail) {
          failedEntries.push({ entry, reason: 'Algum Campo Vazio' });
          return;
        }

        const {
          email, name, companyName, supervisorEmail, stage,
        } = entry;

        const companyWithName = await this.companyRepository.findByName(companyName);
        if (!companyWithName) {
          failedEntries.push({ entry, reason: `Empresa ${companyName} não encontrada` });
          return;
        }

        const supervisorWithEmail = await this.supervisorRepository.findByEmail(supervisorEmail);
        if (!supervisorWithEmail) {
          failedEntries.push({ entry, reason: 'Email do supervisor não registrado' });
          return;
        }

        const sellerWithEmail = await this.sellerRepository.findByEmail(email);
        if (sellerWithEmail) {
          failedEntries.push({ entry, reason: 'Email do vendedor já registrado' });
          return;
        }

        const seller: ICreateSellerDTO = {
          companyId: companyWithName.id,
          supervisorId: supervisorWithEmail.id,
          email,
          image: '', // Não está sendo utilizado
          name,
          stage: stage ?? Stage.Mentoria,
        };

        await this.sellerRepository.create(seller);
      } catch (error: any) {
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
