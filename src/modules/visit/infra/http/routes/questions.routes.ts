import { Router } from 'express';

import QuestionsController from '../controller/QuestionsController';

const questionsRoutes = Router();

const questionsController = new QuestionsController();

questionsRoutes.post('/create', questionsController.create);

questionsRoutes.delete('/delete/:id', questionsController.delete);

questionsRoutes.get('/getAll/:categoryId', questionsController.getAllQuestionsByCategory);

export default questionsRoutes;
