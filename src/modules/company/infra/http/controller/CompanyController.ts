import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import DeleteCompanyService from '@modules/company/services/DeleteCompanyService';
import GetAllCompanyService from '@modules/company/services/GetAllCompanyService';
import UpdateCompanyService from '@modules/company/services/UpdateCompanyService';

export default class CompanyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name,
    } = req.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      image, name,
    });

    return res.status(201).json(company);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCompany = container.resolve(DeleteCompanyService);

    const company = await deleteCompany.execute({ id });

    return res.status(200).json(company);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAllCompany = container.resolve(GetAllCompanyService);

    const company = await getAllCompany.execute();

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, image } = req.body;
    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute(id, { name, image });

    return res.status(200).json(company);
  }
}
