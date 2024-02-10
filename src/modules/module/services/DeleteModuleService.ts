import { inject, injectable } from 'tsyringe';

import { Module } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IModuleRepository from '../repositories/IModuleRepository';

@injectable()
export default class DeleteModuleService {
  constructor(
    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) { }

  public async execute(id: string): Promise<Module> {
    const idExists = await this.moduleRepository.findById(id);

    if (!idExists) throw new AppError('This id does not exist');

    const seller = await this.moduleRepository.delete(id);

    return seller;
  }
}
