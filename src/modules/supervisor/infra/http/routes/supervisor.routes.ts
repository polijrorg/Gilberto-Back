import { Router } from 'express';

import SupervisorController from '../controller/SupervisorController';

const supervisorRoutes = Router();

const supervisorController = new SupervisorController();

supervisorRoutes.post('/login', supervisorController.login);

supervisorRoutes.post('/create', supervisorController.create);

supervisorRoutes.delete('/delete/:id', supervisorController.delete);

supervisorRoutes.get('/getAllFromACompany/:companyId', supervisorController.getAllSupervisorFromACompany);

supervisorRoutes.get('/getAllFromAManager/:managerId', supervisorController.getAllSupervisorFromAManager);

supervisorRoutes.patch('/update/:id', supervisorController.update);

export default supervisorRoutes;