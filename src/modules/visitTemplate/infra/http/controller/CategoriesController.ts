import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoriesService from '@modules/visit/services/CreateCategoriesService';
import DeleteCategoriesService from '@modules/visit/services/DeleteCategoriesService';
import GetAllCategoriesByVisitService from '@modules/visit/services/GetAllCategoriesByVisitService';

export default class CategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, number, comments, grade, visitId,
    } = req.body;

    const createManager = container.resolve(CreateCategoriesService);

    const manager = await createManager.execute({
      name, number, comments, grade, visitId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteCategoriesService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllCategoriesByVisit(req: Request, res: Response): Promise<Response> {
    const { visitId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllCategoriesByVisitService);

    const company = await getAllManagerByCompany.execute(visitId);

    return res.status(200).json(company);
  }
}
