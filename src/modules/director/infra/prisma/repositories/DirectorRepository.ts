import prisma from '@shared/infra/prisma/client';
import { Prisma, Director, Company } from '@prisma/client';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import ICreateDirectorDTO from '@modules/director/dtos/ICreateDirectorDTO';
import IUpdateDirectorDTO from '@modules/director/dtos/IUpdateDirectorDTO';

export default class DirectorRepository implements IDirectorRepository {
  private ormRepository: Prisma.DirectorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.director;
  }

  public async findAll(): Promise<(Director & {company: Company})[]> {
    const directors = await this.ormRepository.findMany({ include: { company: true } });

    return directors as (Director & {company: Company})[];
  }

  public async findById(id: string): Promise<(Director & {company: Company}) | null> {
    const seller = await this.ormRepository.findFirst({
      where: { id },
      include: {
        company: true,
      },
    });

    return seller as (Director & {company: Company}) | null;
  }

  public async findByEmail(email: string): Promise<Director | null> {
    const seller = await this.ormRepository.findFirst({ where: { email } });

    return seller;
  }

  public async create(data: ICreateDirectorDTO): Promise<Director> {
    const seller = await this.ormRepository.create({ data });

    return seller;
  }

  public async delete(id: string): Promise<Director> {
    const seller = await this.ormRepository.delete({ where: { id } });

    return seller;
  }

  public async getAllDirectorByCompany(companyId: string): Promise<Director[] | null> {
    const seller = await this.ormRepository.findMany({ where: { companyId }, orderBy: { name: 'asc' } });

    return seller;
  }

  public async update(id: string, data: IUpdateDirectorDTO): Promise<Director> {
    const seller = await this.ormRepository.update({ where: { id }, data });

    return seller;
  }
}
