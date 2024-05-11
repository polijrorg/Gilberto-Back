import { Router } from 'express';

import ActionPlansController from '../controller/ActionPlansController';

const actionPlansRoutes = Router();

const actionPlansController = new ActionPlansController();

actionPlansRoutes.post('/create', actionPlansController.create);

actionPlansRoutes.delete('/delete/:id', actionPlansController.delete);

actionPlansRoutes.get('/getAll', actionPlansController.getAll);

actionPlansRoutes.patch('/update/:id', actionPlansController.update);

actionPlansRoutes.patch('/markAsDone/:id', actionPlansController.markAsDone);

actionPlansRoutes.get('/getAll/:idSeller', actionPlansController.getActionPlansByIdSeller);


export default actionPlansRoutes;
