import { Router } from 'express';

import SupervisorController from '../controller/SupervisorController';

const supervisorRoutes = Router();

const supervisorController = new SupervisorController();

supervisorRoutes.post('/create', supervisorController.create);

supervisorRoutes.delete('/delete/:id', supervisorController.delete);

supervisorRoutes.get('/getAll/:id', supervisorController.getAll);

supervisorRoutes.patch('/update/:id', supervisorController.update);

export default supervisorRoutes;
