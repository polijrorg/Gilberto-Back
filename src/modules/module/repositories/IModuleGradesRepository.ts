import { ModuleGrades } from '@prisma/client';

import ICreateModuleGradesDTO from '../dtos/ICreateModuleGradesDTO';
import IUpdateModuleGradesDTO from '../dtos/IUpdateModuleGradesDTO';

interface IModuleGradesRepository {
  findById(id: string): Promise<ModuleGrades | null>;
  create(data: ICreateModuleGradesDTO): Promise<ModuleGrades>;
  delete(id: string): Promise<ModuleGrades>;
  getAllModuleGradesFromASeller(sellerId: string): Promise<ModuleGrades[] | null>;
  getAllModuleGradesAll(): Promise<ModuleGrades[] | null>;
  update(id:string, data: IUpdateModuleGradesDTO): Promise<ModuleGrades>;
}

export default IModuleGradesRepository;
