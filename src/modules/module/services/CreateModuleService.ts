import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';
import ICreateModuleDTO from '../dtos/ICreateModuleDTO';

@injectable()
export default class CreateModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(data: ICreateModuleDTO): Promise<Module> {
    const nameAlreadyExists = await this.moduleRepository.findByName(data.name);

    if (nameAlreadyExists) throw new AppError('A module with this name already exists');

    const seller = await this.moduleRepository.create(data);

    return seller;
  }
}
