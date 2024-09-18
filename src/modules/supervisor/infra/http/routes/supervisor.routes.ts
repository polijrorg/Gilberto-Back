import multerConfig from '@config/multer';
import { Router } from 'express';
import multer from 'multer';

import SupervisorController from '../controller/SupervisorController';

const supervisorRoutes = Router();

const supervisorController = new SupervisorController();

supervisorRoutes.post('/login', supervisorController.login);

supervisorRoutes.post('/create', supervisorController.create);
supervisorRoutes.post('/csv', multer(multerConfig).single('supervisorCSV'), supervisorController.uploadCSV);

supervisorRoutes.delete('/delete/:id', supervisorController.delete);

supervisorRoutes.get('/getAllFromACompany/:companyId', supervisorController.getAllSupervisorFromACompany);

supervisorRoutes.get('/getAllFromADirector/:directorId', supervisorController.getAllSupervisorFromADirector);

supervisorRoutes.get('/getAllFromAManager/:managerId', supervisorController.getAllSupervisorFromAManager);

supervisorRoutes.get('/getAll', supervisorController.findAll);

supervisorRoutes.get('/:id', supervisorController.findById);

supervisorRoutes.patch('/update/:id', supervisorController.update);

export default supervisorRoutes;
