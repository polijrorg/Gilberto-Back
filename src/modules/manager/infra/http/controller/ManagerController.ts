import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateManagerService from '@modules/manager/services/CreateManagerService';
import DeleteManagerService from '@modules/manager/services/DeleteManagerService';
import GetAllManagerByCompanyService from '@modules/manager/services/GetAllManagerByCompanyService';
import UpdateManagerService from '@modules/manager/services/UpdateManagerService';
import AuthenticateManagerService from '@modules/manager/services/AuthenticateManagerService';
import GetAllManagerByDirectorService from '@modules/manager/services/GetAllManagerByDirectorService';

export default class ManagerController {
  public async login(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
    } = req.body;

    const authenticateManager = container.resolve(AuthenticateManagerService);

    const { user, token } = await authenticateManager.execute({ email, password });

    return res.json({ user, token });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, email, password, companyId, directorId,
    } = req.body;

    const createManager = container.resolve(CreateManagerService);

    const manager = await createManager.execute({
      image, name, email, password, companyId, directorId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteManagerService);

    const manager = await deleteManager.execute({ id });

    return res.status(200).json(manager);
  }

  public async getAllManagerByCompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllManagerByCompanyService);

    const company = await getAllManagerByCompany.execute({ companyId });

    return res.status(200).json(company);
  }

  public async getAllManagerByDirector(req: Request, res: Response): Promise<Response> {
    const { directorId } = req.params;

    const getAllManagerByDirector = container.resolve(GetAllManagerByDirectorService);

    const company = await getAllManagerByDirector.execute(directorId);

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      image, name, email, password,
    } = req.body;

    const updateManager = container.resolve(UpdateManagerService);

    const manager = await updateManager.execute(id, {
      image, name, email, password,
    });

    return res.status(200).json(manager);
  }
}
