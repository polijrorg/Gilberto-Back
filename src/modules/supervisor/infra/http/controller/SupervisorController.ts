import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupervisorService from '@modules/supervisor/services/CreateSupervisorService';
import DeleteSupervisorService from '@modules/supervisor/services/DeleteSupervisorService';
import FindByIdSupervisorService from '@modules/supervisor/services/FindByIdSupervisorService';
import GetAllSupervisor from '@modules/supervisor/services/GetAllSupervisor';
import UpdateSupervisorService from '@modules/supervisor/services/UpdateSupervisorService';
import AuthenticateSupervisorService from '@modules/supervisor/services/AuthenticateSupervisorService';
import GetAllSupervisorFromAManagerService from '@modules/supervisor/services/GetAllSupervisorFromAManagerService';
import GetAllSupervisorFromACompanyService from '@modules/supervisor/services/GetAllSupervisorFromACompanyService';
import GetAllSupervisorFromADirectorService from '@modules/supervisor/services/GetAllSupervisorFromADirectorService';
import ParseSupervisorCSVService from '@modules/supervisor/services/ParseSupervisorCSVService';

export default class SupervisorController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateSupervisor = container.resolve(AuthenticateSupervisorService);

    const { user, token } = await authenticateSupervisor.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name, email, password, image, managerId, companyId,
    } = req.body;

    const createSupervisor = container.resolve(CreateSupervisorService);

    const supervisor = await createSupervisor.execute({
      name, email, password, image, managerId, companyId,
    });

    return res.status(201).json(supervisor);
  }

  public async uploadCSV(req: Request, res: Response): Promise<Response> {
    const supervisorCSV = req.file;

    if (!supervisorCSV || !supervisorCSV.mimetype.includes('csv')) {
      return res.status(400).json({ error: 'Invalid file type. Please upload a CSV file.' });
    }

    const parseSupervisorCSVService = container.resolve(ParseSupervisorCSVService);

    try {
      const supervisors = await parseSupervisorCSVService.execute(supervisorCSV);
      return res.status(200).json({ supervisors });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSupervisor = container.resolve(DeleteSupervisorService);

    const supervisor = await deleteSupervisor.execute({ id });

    return res.status(200).json(supervisor);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findByIdSupervisorService = container.resolve(FindByIdSupervisorService);

    const supervisor = await findByIdSupervisorService.execute(id);

    return res.status(200).json(supervisor);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const getAllSupervisor = container.resolve(GetAllSupervisor);

    const supervisor = await getAllSupervisor.execute();

    return res.status(200).json(supervisor);
  }

  public async getAllSupervisorFromACompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const getSupervisor = container.resolve(GetAllSupervisorFromACompanyService);

    const supervisor = await getSupervisor.execute(companyId);

    return res.status(200).json(supervisor);
  }

  public async getAllSupervisorFromAManager(req: Request, res: Response): Promise<Response> {
    const { managerId } = req.params;

    const getSupervisor = container.resolve(GetAllSupervisorFromAManagerService);

    const supervisor = await getSupervisor.execute(managerId);

    return res.status(200).json(supervisor);
  }

  public async getAllSupervisorFromADirector(req: Request, res: Response): Promise<Response> {
    const { directorId } = req.params;

    const getSupervisor = container.resolve(GetAllSupervisorFromADirectorService);

    const supervisor = await getSupervisor.execute(directorId);

    return res.status(200).json(supervisor);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      image, name, email, password, managerId,
    } = req.body;

    const updateSupervisor = container.resolve(UpdateSupervisorService);

    const supervisor = await updateSupervisor.execute(id, {
      image, name, email, password, managerId,
    });

    return res.status(200).json(supervisor);
  }
}
