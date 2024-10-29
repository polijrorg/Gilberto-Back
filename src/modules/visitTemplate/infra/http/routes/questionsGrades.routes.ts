import { Router } from 'express';

import QuestionsGradesController from '../controller/QuestionsGradesController';

const questionsGradesRoutes = Router();

const questionsGradesController = new QuestionsGradesController();

questionsGradesRoutes.post('/create', questionsGradesController.create);

questionsGradesRoutes.delete('/delete/:id', questionsGradesController.delete);

questionsGradesRoutes.get('/getCommentsFromVisit/:idVisit', questionsGradesController.getGradeByVisitID);

questionsGradesRoutes.get('/averageGradeByQuestions/supervisor/:idSupervisor/:idTemplate', questionsGradesController.getAverageGradeByQuestions);

questionsGradesRoutes.get('/averageGradeByQuestions/manager/:idManager/:idTemplate', questionsGradesController.getAverageGradeByQuestionsManager);

questionsGradesRoutes.get('/averageGradeByQuestions/seller/:idSeller/:idTemplate', questionsGradesController.getAverageGradeByQuestionsSeller);

questionsGradesRoutes.get('/getAllBySeller/:sellerId', questionsGradesController.getAllQuestionsGradesBySeller);

questionsGradesRoutes.patch('/update/:id', questionsGradesController.update);

export default questionsGradesRoutes;
