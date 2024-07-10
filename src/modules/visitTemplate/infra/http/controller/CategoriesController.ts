import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoriesService from '@modules/visitTemplate/services/CreateCategoriesService';
import DeleteCategoriesService from '@modules/visitTemplate/services/DeleteCategoriesService';
import GetAllCategoriesByVisitService from '@modules/visitTemplate/services/GetAllCategoriesByVisitService';
import UpdateCategoriesService from '@modules/visitTemplate/services/UpdateCategoriesService';

export default class CategoriesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, number, comments, visitTemplateId,
    } = req.body;

    const createManager = container.resolve(CreateCategoriesService);

    const manager = await createManager.execute({
      name, number, comments, visitTemplateId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteCategoriesService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id: idUser } = req.token;
    const { id } = req.params;
    const { name, comments } = req.body;

    const updateCategoriesService = container.resolve(UpdateCategoriesService);

    const newCategory = await updateCategoriesService.execute(id, { name, comments }, idUser);

    return res.status(200).json(newCategory);
  }

  public async getAllCategoriesByVisit(req: Request, res: Response): Promise<Response> {
    const { visitTemplateId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllCategoriesByVisitService);

    const company = await getAllManagerByCompany.execute(visitTemplateId);

    return res.status(200).json(company);
  }
}
