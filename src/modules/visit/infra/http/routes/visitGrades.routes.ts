import { Router } from 'express';

import VisitGradesController from '../controller/VisitGradesController';

const visitGradesRoutes = Router();

const visitGradesController = new VisitGradesController();

visitGradesRoutes.post('/create', visitGradesController.create);

visitGradesRoutes.delete('/delete/:id', visitGradesController.delete);

visitGradesRoutes.get('/getAll/:sellerId', visitGradesController.getAllVisitGradesBySeller);

export default visitGradesRoutes;
