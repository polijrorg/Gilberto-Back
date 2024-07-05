import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateDirectorService from '@modules/director/services/AuthenticateDirectorService';
import AuthenticateGilbasService from '@modules/director/services/AuthenticateGilbasService';
import CreateDirectorService from '@modules/director/services/CreateDirectorService';
import DeleteDirectorService from '@modules/director/services/DeleteDirectorService';
import GetAllDirectorByCompanyService from '@modules/director/services/GetAllDirectorByCompanyService';
import UpdateDirectorService from '@modules/director/services/UpdateDirectorService';

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

  public async admin(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateManager = container.resolve(AuthenticateGilbasService);

    const { token } = await authenticateManager.execute({ email, password });

    return res.json({ token });
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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteDirectorService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
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
