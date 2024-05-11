import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateActionPlansService from '@modules/actionPlans/services/CreateActionPlansService';
import DeleteActionPlansService from '@modules/actionPlans/services/DeleteActionPlansService';
import GetAllActionPlansService from '@modules/actionPlans/services/GetAllActionPlansService';
import GetByIdAllActionByIdSeller from '@modules/actionPlans/services/GetByIdAllActionByIdSeller';
import UpdateActionPlansService from '@modules/actionPlans/services/UpdateActionPlansService';
import MarkActionPlanAsDoneService from '@modules/actionPlans/services/MarkActionPlanAsDoneService';

export default class ActionPlansController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        sellerId, supervisorId, prize, comments, title, visitId, moduleId,
      } = req.body;

      const createModule = container.resolve(CreateActionPlansService);

      const module = await createModule.execute({
        sellerId, supervisorId, prize, comments, title, visitId, moduleId,
      });

      return res.status(201).json(module);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }

  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteModule = container.resolve(DeleteActionPlansService);

    const module = await deleteModule.execute(id);

    return res.status(200).json(module);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAllModule = container.resolve(GetAllActionPlansService);

    const module = await getAllModule.execute();

    return res.status(200).json(module);
  }

  public async getActionPlansByIdSeller(req: Request, res:Response): Promise<Response>{
    try {
      const { idSeller } = req.params;
      const getActionPlans = container.resolve(GetByIdAllActionByIdSeller);
      const plans = await getActionPlans.execute({ idSeller});
      return res.status(200).json(plans)
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      prize, comments, title,
    } = req.body;

    const UpdateModule = container.resolve(UpdateActionPlansService);

    const module = await UpdateModule.execute(id, {
      prize, comments, title,
    });

    return res.status(200).json(module);
  }

  public async markAsDone(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const UpdateModule = container.resolve(MarkActionPlanAsDoneService);

    const module = await UpdateModule.execute(id);

    return res.status(200).json(module);
  }
}
