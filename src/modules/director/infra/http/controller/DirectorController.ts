import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateDirectorService from '@modules/director/services/AuthenticateDirectorService';
import AuthenticateAdminService from '@modules/director/services/AuthenticateAdminService';
import CreateDirectorService from '@modules/director/services/CreateDirectorService';
import DeleteDirectorService from '@modules/director/services/DeleteDirectorService';
import FindByIdDirectorService from '@modules/director/services/FindByIdDirectorService';
import GetAllDirectorByCompanyService from '@modules/director/services/GetAllDirectorByCompanyService';
import FindAllDirectorService from '@modules/director/services/FindAllDirectorService';
import UpdateDirectorService from '@modules/director/services/UpdateDirectorService';
import ParseDirectorCSVService from '@modules/director/services/ParseDirectorCSVService';

export default class ManagerController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateManager = container.resolve(AuthenticateDirectorService);

    const { user, token } = await authenticateManager.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, email, password, companyId,
    } = req.body;

    const createManager = container.resolve(CreateDirectorService);

    const manager = await createManager.execute({
      image, name, email, password, companyId,
    });

    return res.status(201).json(manager);
  }

  public async uploadCSV(req: Request, res: Response): Promise<Response> {
    const directorCSV = req.file;

    if (!directorCSV || !directorCSV.mimetype.includes('csv')) {
      return res.status(400).json({ error: 'Invalid file type. Please upload a CSV file.' });
    }

    const parseDirectorCSVService = container.resolve(ParseDirectorCSVService);

    try {
      const directors = await parseDirectorCSVService.execute(directorCSV);
      return res.status(200).json({ directors });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async adminLogin(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateAdminService = container.resolve(AuthenticateAdminService);

    const manager = await authenticateAdminService.execute({
      email, password,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteDirectorService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findByIdDirectorService = container.resolve(FindByIdDirectorService);

    const director = await findByIdDirectorService.execute(id);

    return res.status(200).json(director);
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const findAllDirectorService = container.resolve(FindAllDirectorService);

    const director = await findAllDirectorService.execute();

    return res.status(200).json(director);
  }

  public async getAllDirectorByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllDirectorByCompanyService);

    const company = await getAllManagerByCompany.execute(companyId);

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      image, name, email, password,
    } = req.body;

    const updateManager = container.resolve(UpdateDirectorService);

    const manager = await updateManager.execute(id, {
      image, name, email, password,
    });

    return res.status(200).json(manager);
  }
}
