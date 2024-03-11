import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVisitGradesService from '@modules/visit/services/CreateVisitGradesService';
import DeleteVisitGradesService from '@modules/visit/services/DeleteVisitGradesService';
import GetAllVisitGradesService from '@modules/visit/services/GetAllVisitGradesService';

export default class VisitGradesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      sellerId, visitId, grade, comments,
    } = req.body;

    const createManager = container.resolve(CreateVisitGradesService);

    const manager = await createManager.execute({
      sellerId, visitId, grade, comments,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteVisitGradesService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllVisitGradesBySeller(req: Request, res: Response): Promise<Response> {
    const { sellerId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllVisitGradesService);

    const company = await getAllManagerByCompany.execute(sellerId);

    return res.status(200).json(company);
  }
}
