import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSellerService from '@modules/seller/services/CreateSellerService';
import DeleteSellerService from '@modules/seller/services/DeleteSellerService';
import GetAllSellerFromASupervisorService from '@modules/seller/services/GetAllSellerFromASupervisorService';
import GetAllSellerFromACompanyService from '@modules/seller/services/GetAllSellerFromACompanyService';
import UpdateSellerService from '@modules/seller/services/UpdateSellerService';

export default class SellerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, email, supervisorId, companyId,
    } = req.body;

    const createSeller = container.resolve(CreateSellerService);

    const seller = await createSeller.execute({
      image, name, email, supervisorId, companyId,
    });

    return res.status(201).json(seller);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSeller = container.resolve(DeleteSellerService);

    const seller = await deleteSeller.execute({ id });

    return res.status(200).json(seller);
  }

  public async getAllFromASupervisor(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerFromASupervisorService);

    const seller = await getAllSeller.execute(supervisorId);

    return res.status(200).json(seller);
  }

  public async getAllFromACompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerFromACompanyService);

    const seller = await getAllSeller.execute(companyId);

    return res.status(200).json(seller);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { image, name, supervisorId } = req.body;

    const updateSeller = container.resolve(UpdateSellerService);

    const seller = await updateSeller.execute(id, { image, name, supervisorId });

    return res.status(200).json(seller);
  }
}
