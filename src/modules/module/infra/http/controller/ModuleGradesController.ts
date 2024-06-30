import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleGradesService from '@modules/module/services/CreateModuleGradesService';
import DeleteModuleGradesService from '@modules/module/services/DeleteModuleGradesService';
import CalculateModuleAveragesService from '@modules/module/services/CalculateModuleAveragesService';
import GetAllModuleGradesFromASellerService from '@modules/module/services/GetAllModuleGradesFromASellerService';
import UpdateModuleGradesService from '@modules/module/services/UpdateModuleGradesService';

export default class ModuleController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      implementationScore, knowledgeScore, supervisorComment, moduleId, sellerId,
    } = req.body;

    const media = (implementationScore + knowledgeScore) / 2;

    const createModule = container.resolve(CreateModuleGradesService);

    const module = await createModule.execute({
      implementationScore, knowledgeScore, media, supervisorComment, moduleId, sellerId,
    });

    return res.status(201).json(module);
  }

  public async calculateModuleAverages(req: Request, res: Response): Promise<Response> {
    const calculateAverages = container.resolve(CalculateModuleAveragesService);

    const moduleAverages = await calculateAverages.execute();

    const modulesWithAverages = moduleAverages?.map((module) => {
      const average = moduleAverages.find((avg) => avg.moduleId === module.moduleId)?.average || 0;
      return {
        ...module,
        average,
      };
    });

    return res.status(200).json(modulesWithAverages);
    // eslint-disable-next-line no-empty
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteModule = container.resolve(DeleteModuleGradesService);

    const module = await deleteModule.execute(id);

    return res.status(200).json(module);
  }

  public async getAllModuleGradesFromASeller(req: Request, res: Response): Promise<Response> {
    const { sellerId } = req.params;

    const getAllModuleGrades = container.resolve(GetAllModuleGradesFromASellerService);

    const module = await getAllModuleGrades.execute(sellerId);

    return res.status(200).json(module);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { implementationScore, knowledgeScore, supervisorComment } = req.body;
    const media = (knowledgeScore + implementationScore) / 2;

    const UpdateModuleGrades = container.resolve(UpdateModuleGradesService);

    const module = await UpdateModuleGrades.execute(id, {
      implementationScore, knowledgeScore, supervisorComment, media,
    });

    return res.status(200).json(module);
  }
}
