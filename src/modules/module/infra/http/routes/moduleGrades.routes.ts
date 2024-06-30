import { Router } from 'express';

import ModuleGradesController from '../controller/ModuleGradesController';

const moduleGradesRoutes = Router();

const moduleGradesController = new ModuleGradesController();

moduleGradesRoutes.post('/create', moduleGradesController.create);

moduleGradesRoutes.delete('/delete/:id', moduleGradesController.delete);

moduleGradesRoutes.get('/getAll/:sellerId', moduleGradesController.getAllModuleGradesFromASeller);

moduleGradesRoutes.patch('/update/:id', moduleGradesController.update);

moduleGradesRoutes.get('/getModuleAverages', moduleGradesController.calculateModuleAverages);

export default moduleGradesRoutes;
