import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/middlewares/EnsureAuthenticated';
import QuestionsController from '../controller/QuestionsController';

const questionsRoutes = Router();

const questionsController = new QuestionsController();

questionsRoutes.post('/create', questionsController.create);

questionsRoutes.delete('/delete/:id', questionsController.delete);

questionsRoutes.put('/:id', ensureAuthenticated, questionsController.update);

questionsRoutes.get('/getAll/:categoryId', questionsController.getAllQuestionsByCategory);

export default questionsRoutes;
