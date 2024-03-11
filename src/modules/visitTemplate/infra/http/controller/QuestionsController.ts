import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuestionsService from '@modules/visitTemplate/services/CreateQuestionsService';
import DeleteQuestionsService from '@modules/visitTemplate/services/DeleteQuestionsService';
import GetAllQuestionsByCategoryService from '@modules/visitTemplate/services/GetAllQuestionsByCategoryService';

export default class QuestionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      question, number, categoriesId,
    } = req.body;

    const createManager = container.resolve(CreateQuestionsService);

    const manager = await createManager.execute({
      question, number, categoriesId,
    });

    return res.status(201).json(manager);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteQuestionsService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllQuestionsByCategory(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllQuestionsByCategoryService);

    const company = await getAllManagerByCompany.execute(categoryId);

    return res.status(200).json(company);
  }
}
