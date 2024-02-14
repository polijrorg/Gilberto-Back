import { Module } from '@prisma/client';

import ICreateModuleDTO from '../dtos/ICreateModuleDTO';
import IUpdateModuleDTO from '../dtos/IUpdateModule';

interface IModuleRepository {
  create(data: ICreateModuleDTO): Promise<Module>;
  delete(id: string): Promise<Module>;
  getAllModules(): Promise<Module[] | null>;
  update(id: string, data: IUpdateModuleDTO): Promise<Module>;
  findByName(name: string): Promise<Module | null>;
  findById(id: string): Promise<Module | null>;
}

export default IModuleRepository;
