import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSellerService from '@modules/seller/services/CreateSellerService';
import DeleteSellerService from '@modules/seller/services/DeleteSellerService';
import GetAllSellerFromASupervisorService from '@modules/seller/services/GetAllSellerFromASupervisorService';

export default class SellerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, email, supervisorId,
    } = req.body;

    const createSeller = container.resolve(CreateSellerService);

    const seller = await createSeller.execute({
      image, name, email, supervisorId,
    });

    return res.status(201).json(seller);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSeller = container.resolve(DeleteSellerService);

    const seller = await deleteSeller.execute({ id });

    return res.status(200).json(seller);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.body;

    const getAllSeller = container.resolve(GetAllSellerFromASupervisorService);

    const seller = await getAllSeller.execute({ supervisorId });

    return res.status(200).json(seller);
  }
}
