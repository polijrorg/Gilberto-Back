import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleService from '@modules/module/services/CreateModuleService';
import DeleteModuleService from '@modules/module/services/DeleteModuleService';
import GetAllModuleService from '@modules/module/services/GetAllModuleService';
import GetModulesInfoService from '@modules/module/services/GetModulesInfoService';
import UpdateModuleService from '@modules/module/services/UpdateModuleService';

export default class ModuleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
    } = req.body;

    const createModule = container.resolve(CreateModuleService);

    const module = await createModule.execute({ name });

    return res.status(201).json(module);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteModule = container.resolve(DeleteModuleService);

    const module = await deleteModule.execute(id);

    return res.status(200).json(module);
  }

  public async getAllModule(req: Request, res: Response): Promise<Response> {
    const getAllModule = container.resolve(GetAllModuleService);

    const module = await getAllModule.execute();

    return res.status(200).json(module);
  }

  public async getAllModuleInfo(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.params;
    const getAllModuleInfo = container.resolve(GetModulesInfoService);

    const moduleinfo = await getAllModuleInfo.execute(supervisorId);

    return res.status(200).json(moduleinfo);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    const UpdateModule = container.resolve(UpdateModuleService);

    const module = await UpdateModule.execute(id, { name });

    return res.status(200).json(module);
  }
}
