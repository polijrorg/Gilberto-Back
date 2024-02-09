import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupervisorService from '@modules/supervisor/services/CreateSupervisorService';
import DeleteSupervisorService from '@modules/supervisor/services/DeleteSupervisorService';
import GetAllSupervisorService from '@modules/supervisor/services/GetAllSupervisorService';
import UpdateSupervisorService from '@modules/supervisor/services/UpdateSupervisorService';
import AuthenticateSupervisorService from '@modules/supervisor/services/AuthenticateSupervisorService';

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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSupervisor = container.resolve(DeleteSupervisorService);

    const supervisor = await deleteSupervisor.execute({ id });

    return res.status(200).json(supervisor);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getSupervisor = container.resolve(GetAllSupervisorService);

    const supervisor = await getSupervisor.execute(id);

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
