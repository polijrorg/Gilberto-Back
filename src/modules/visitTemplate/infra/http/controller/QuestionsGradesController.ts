import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateQuestionsGradesService from '@modules/visitTemplate/services/CreateQuestionsGradesService';
import DeleteQuestionsGradesService from '@modules/visitTemplate/services/DeleteQuestionsGradesService';
import GetAllQuestionsGradesBySellerService from '@modules/visitTemplate/services/GetAllQuestionsGradesBySellerService';
import UpdateQuestionsGradesService from '@modules/visitTemplate/services/UpdateQuestionsGradesService';
import GetAverageGradeByQuestionsService from '@modules/visitTemplate/services/GetAverageGradeByQuestionsService ';

export default class QuestionsGradesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      grade, sellerId, questionsId, visitId,
    } = req.body;

    const createManager = container.resolve(CreateQuestionsGradesService);

    const manager = await createManager.execute({
      grade, sellerId, questionsId, visitId,
    });

    return res.status(201).json(manager);
  }

  public async getAverageGradeByQuestions(req: Request, res: Response): Promise<Response> {
    const getAverageGradeService = container.resolve(GetAverageGradeByQuestionsService);

    const averageGrades = await getAverageGradeService.execute();

    return res.status(200).json(averageGrades);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteManager = container.resolve(DeleteQuestionsGradesService);

    const manager = await deleteManager.execute(id);

    return res.status(200).json(manager);
  }

  public async getAllQuestionsGradesBySeller(req: Request, res: Response): Promise<Response> {
    const { sellerId } = req.params;

    const getAllManagerByCompany = container.resolve(GetAllQuestionsGradesBySellerService);

    const company = await getAllManagerByCompany.execute(sellerId);

    return res.status(200).json(company);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { grade } = req.body;

    const getAllManagerByCompany = container.resolve(UpdateQuestionsGradesService);

    const company = await getAllManagerByCompany.execute(id, { grade });

    return res.status(200).json(company);
  }
}
