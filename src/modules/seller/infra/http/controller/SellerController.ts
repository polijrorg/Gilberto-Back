import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSellerService from '@modules/seller/services/CreateSellerService';
import DeleteSellerService from '@modules/seller/services/DeleteSellerService';
import FindSellerById from '@modules/seller/services/FindSellerById';
import GetllManagerAndDirectorFromSellerService from '@modules/seller/services/GetllManagerAndDirectorFromSellerService';
import GetAllSellerFromASupervisorService from '@modules/seller/services/GetAllSellerFromASupervisorService';
import GetAllSellerPendenteFromASupervisorService from '@modules/seller/services/GetAllSellerPendenteFromASupervisorService';
import GetAllSellerVisitaFromASupervisorService from '@modules/seller/services/GetAllSellerVisitaFromASupervisorService';
import GetAllSellerMentoriaFromASupervisorService from '@modules/seller/services/GetAllSellerMentoriaFromASupervisorService';
import GetAllSellerFromACompanyService from '@modules/seller/services/GetAllSellerFromACompanyService';
import UpdateSellerService from '@modules/seller/services/UpdateSellerService';
import GetAllSellerFromAManagerService from '@modules/seller/services/GetAllSellerFromAManagerService';
import GetAllSellerFromADirectorService from '@modules/seller/services/GetAllSellerFromADirector';
import GeneratePdfService from '@modules/seller/services/GeneratePdfSellerVisit';

export default class SellerController {
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findSellerById = container.resolve(FindSellerById);

    const seller = await findSellerById.execute({ id });

    return res.status(200).json(seller);
  }

  public async getManagerAndDirectorFromSeller(req: Request, res: Response): Promise<Response> {
    const {
      idSeller,
    } = req.params;

    const getllManagerAndDirectorFromSellerService = container.resolve(GetllManagerAndDirectorFromSellerService);

    const seller = await getllManagerAndDirectorFromSellerService.execute(
      idSeller,
    );

    return res.status(200).json(seller);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, email, supervisorId, companyId, stage,
    } = req.body;

    const createSeller = container.resolve(CreateSellerService);

    const seller = await createSeller.execute({
      image, name, email, supervisorId, companyId, stage,
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

  public async getAllPendenteFromASupervisor(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerPendenteFromASupervisorService);

    const seller = await getAllSeller.execute(supervisorId);

    return res.status(200).json(seller);
  }

  public async getAllVisitaFromASupervisor(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerVisitaFromASupervisorService);

    const seller = await getAllSeller.execute(supervisorId);

    return res.status(200).json(seller);
  }

  public async getAllMentoriaFromASupervisor(req: Request, res: Response): Promise<Response> {
    const { supervisorId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerMentoriaFromASupervisorService);

    const seller = await getAllSeller.execute(supervisorId);

    return res.status(200).json(seller);
  }

  public async getAllFromAManager(req: Request, res: Response): Promise<Response> {
    const { managerId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerFromAManagerService);

    const seller = await getAllSeller.execute(managerId);

    return res.status(200).json(seller);
  }

  public async getAllFromADirector(req: Request, res: Response): Promise<Response> {
    const { directorId } = req.params;

    const getAllSeller = container.resolve(GetAllSellerFromADirectorService);

    const seller = await getAllSeller.execute(directorId);

    return res.status(200).json(seller);
  }

  public async generatePdf(req: Request, res: Response): Promise<Response> {
    const { sellerId } = req.params;

    const dateVisit = decodeURIComponent(req.params.dateVisit);

    const getAllSeller = container.resolve(GeneratePdfService);

    const seller = await getAllSeller.execute(sellerId, dateVisit);

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
    const {
      image, name, supervisorId, stage,
    } = req.body;

    const updateSeller = container.resolve(UpdateSellerService);

    const seller = await updateSeller.execute(id, {
      image, name, supervisorId, stage,
    });

    return res.status(200).json(seller);
  }
}
