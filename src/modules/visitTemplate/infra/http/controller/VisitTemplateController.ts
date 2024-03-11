import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVisitTemplateService from '@modules/visitTemplate/services/CreateVisitService';
import DeleteVisitTemplateService from '@modules/visitTemplate/services/DeleteVisitService';
import GetVisitByCompanyService from '@modules/visitTemplate/services/GetVisitByCompanyService';
import GetVisitByManagerService from '@modules/visitTemplate/services/GetVisitByManagerService';
import GetVisitByDirectorService from '@modules/visitTemplate/services/GetVisitByDirectorService';
import UpdateVisitTemplateService from '@modules/visitTemplate/services/UpdateVisitTemplateService';

export default class VisitTemplateController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      companyId, directorId, managerId,
    } = req.body;

    const createManager = container.resolve(CreateVisitTemplateService);

    const manager = await createManager.execute({
      companyId, directorId, managerId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteVisitTemplateService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getVisitByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const getAllManagerByCompany = container.resolve(GetVisitByCompanyService);

    const company = await getAllManagerByCompany.execute(companyId);

    return res.status(200).json(company);
  }

  public async getVisitByManager(req: Request, res: Response): Promise<Response> {
    const { managerId } = req.params;

    const getAllManagerByCompany = container.resolve(GetVisitByManagerService);

    const company = await getAllManagerByCompany.execute(managerId);

    return res.status(200).json(company);
  }

  public async getVisitByDirector(req: Request, res: Response): Promise<Response> {
    const { directorId } = req.params;

    const getAllManagerByCompany = container.resolve(GetVisitByDirectorService);

    const company = await getAllManagerByCompany.execute(directorId);

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { managerId, directorId } = req.body;

    const getAllManagerByCompany = container.resolve(UpdateVisitTemplateService);

    const company = await getAllManagerByCompany.execute(id, { managerId, directorId });

    return res.status(200).json(company);
  }
}
