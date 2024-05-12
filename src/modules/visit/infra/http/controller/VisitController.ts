import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateVisitService from "@modules/visit/services/CreateVisitService";
import DeleteVisitService from "@modules/visit/services/DeleteVisitService";
import getAllVisitBySellerService from "@modules/visit/services/GetAllVisitBySellerService";
import GetAllVisitService from "@modules/visit/services/GetAllVisitService";
import UpdateVisitService from "@modules/visit/services/UpdateVisitService";

export default class VisitController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { storeVisited, dateVisited, sellerId, visitTemplateId } = req.body;

    const createManager = container.resolve(CreateVisitService);

    const manager = await createManager.execute({
      storeVisited,
      dateVisited,
      sellerId,
      visitTemplateId,
    });

    return res.status(201).json(manager);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const getAllVisitService = container.resolve(GetAllVisitService);

      const visits = await getAllVisitService.execute();

      return res.status(200).json(visits);
    } catch (error) {
      return res.status(error.statusCode || 500).json(error.message);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteVisitService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllVisitBySeller(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { sellerId } = req.params;

    const getAllManagerByCompany = container.resolve(
      getAllVisitBySellerService
    );

    const company = await getAllManagerByCompany.execute(sellerId);

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { grade, comments } = req.body;

    const getAllManagerByCompany = container.resolve(UpdateVisitService);

    const company = await getAllManagerByCompany.execute(id, {
      grade,
      comments,
    });

    return res.status(200).json(company);
  }
}
