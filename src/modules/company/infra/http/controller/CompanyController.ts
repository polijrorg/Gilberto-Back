import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import DeleteCompanyService from '@modules/company/services/DeleteCompanyService';
import GetAllCompanyService from '@modules/company/services/GetAllCompanyService';
import UpdateCompanyService from '@modules/company/services/UpdateCompanyService';
import GetCompanyByidService from '@modules/company/services/GetCompanyByidService';
import ParseCompanyCSVService from '../../../services/ParseWorkerCSVService';

export default class CompanyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      image, name, stage,
    } = req.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      image, name, stage,
    });

    return res.status(201).json(company);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCompany = container.resolve(DeleteCompanyService);

    const company = await deleteCompany.execute({ id });

    return res.status(200).json(company);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getCompanyByidService = container.resolve(GetCompanyByidService);

    const company = await getCompanyByidService.execute(id);

    return res.status(200).json(company);
  }

  public async uploadCSV(req: Request, res: Response): Promise<Response> {
    const companyCSV = req.file;

    if (!companyCSV || !companyCSV.mimetype.includes('csv')) {
      return res.status(400).json({ error: 'Invalid file type. Please upload a CSV file.' });
    }

    const parseCompanyCSVService = container.resolve(ParseCompanyCSVService);

    try {
      const companies = await parseCompanyCSVService.execute(companyCSV);
      return res.status(200).json({ companies });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const getAllCompany = container.resolve(GetAllCompanyService);

    const company = await getAllCompany.execute();

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name, image, stage, selectedVisitTemplateId,
    } = req.body;
    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute(id, {
      name, image, stage, selectedVisitTemplateId,
    });

    return res.status(200).json(company);
  }
}
