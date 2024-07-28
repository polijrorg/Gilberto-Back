import { Router } from 'express';

import QuestionsGradesController from '../controller/QuestionsGradesController';

const questionsGradesRoutes = Router();

const questionsGradesController = new QuestionsGradesController();

questionsGradesRoutes.post('/create', questionsGradesController.create);

questionsGradesRoutes.delete('/delete/:id', questionsGradesController.delete);

questionsGradesRoutes.get('/averageGradeByQuestions', questionsGradesController.getAverageGradeByQuestions);

questionsGradesRoutes.get('/getAllBySeller/:sellerId', questionsGradesController.getAllQuestionsGradesBySeller);

questionsGradesRoutes.patch('/update/:id', questionsGradesController.update);

export default questionsGradesRoutes;
