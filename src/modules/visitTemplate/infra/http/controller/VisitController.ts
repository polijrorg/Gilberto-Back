import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVisitService from '@modules/visit/services/CreateVisitService';
import DeleteVisitService from '@modules/visit/services/DeleteVisitService';
import getAllVisitBySellerService from '@modules/visit/services/GetAllVisitBySellerService';

export default class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      storeVisited, dateVisited, sellerId,
    } = req.body;

    const createManager = container.resolve(CreateVisitService);

    const manager = await createManager.execute({
      storeVisited, dateVisited, sellerId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteVisitService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllVisitBySeller(req: Request, res: Response): Promise<Response> {
    const { sellerId } = req.params;

    const getAllManagerByCompany = container.resolve(getAllVisitBySellerService);

    const company = await getAllManagerByCompany.execute(sellerId);

    return res.status(200).json(company);
  }
}
