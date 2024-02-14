import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';
import IUpdateModuleDTO from '../dtos/IUpdateModule';

@injectable()
export default class UpdateModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(id: string, data: IUpdateModuleDTO): Promise<Module> {
    const nameAlreadyExists = await this.moduleRepository.findByName(data.name);

    if (nameAlreadyExists) throw new AppError('This module name already exist');

    const seller = await this.moduleRepository.update(id, data);

    return seller;
  }
}
