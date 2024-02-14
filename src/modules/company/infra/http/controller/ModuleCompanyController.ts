import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateModuleCompanyService from '@modules/company/services/CreateModuleCompanyService';
import DeleteModuleCompanyService from '@modules/company/services/DeleteModuleCompanyService';
import GetAllModuleCompanyService from '@modules/company/services/GetAllModuleCompanyService';
import GetAllModulesFromACompanyService from '@modules/company/services/GetAllModulesFromACompanyService';
import GetAllCompaniesWithAModuleService from '@modules/company/services/GetAllCompaniesWithAModuleService';

export default class CompanyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      companyId, moduleId,
    } = req.params;

    const createCompany = container.resolve(CreateModuleCompanyService);

    const company = await createCompany.execute({
      companyId, moduleId,
    });

    return res.status(201).json(company);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCompany = container.resolve(DeleteModuleCompanyService);

    const company = await deleteCompany.execute(id);

    return res.status(200).json(company);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAllCompany = container.resolve(GetAllModuleCompanyService);

    const company = await getAllCompany.execute();

    return res.status(200).json(company);
  }

  public async getAllModulesFromACompany(req: Request, res: Response): Promise<Response> {
    const { companyId } = req.params;

    const updateCompany = container.resolve(GetAllModulesFromACompanyService);

    const company = await updateCompany.execute(companyId);

    return res.status(200).json(company);
  }

  public async getAllCompaniesWithAModule(req: Request, res: Response): Promise<Response> {
    const { moduleId } = req.params;

    const updateCompany = container.resolve(GetAllCompaniesWithAModuleService);

    const company = await updateCompany.execute(moduleId);

    return res.status(200).json(company);
  }
}
