import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupervisorService from '@modules/supervisor/services/CreateSupervisorService';
import DeleteSupervisorService from '@modules/supervisor/services/DeleteSupervisorService';
import GetAllSupervisorService from '@modules/supervisor/services/GetAllSupervisorService';
import UpdateSupervisorNameService from '@modules/supervisor/services/UpdateSupervisorNameService';

export default class SupervisorController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, image } = req.body;

    const createSupervisor = container.resolve(CreateSupervisorService);

    const supervisor = await createSupervisor.execute({ name, email, image });

    return res.status(201).json(supervisor);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSupervisor = container.resolve(DeleteSupervisorService);

    const supervisor = await deleteSupervisor.execute({ id });

    return res.status(200).json(supervisor);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getSupervisor = container.resolve(GetAllSupervisorService);

    const supervisor = await getSupervisor.execute();

    return res.status(200).json(supervisor);
  }

  public async updateName(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { newName } = req.body;

    const updateSupervisor = container.resolve(UpdateSupervisorNameService);

    const supervisor = await updateSupervisor.execute({ id, newName });

    return res.status(200).json(supervisor);
  }
}
