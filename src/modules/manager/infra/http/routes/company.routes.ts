import { Router } from 'express';

import ManagerController from '../controller/ManagerController';

const managerRoutes = Router();

const managerController = new ManagerController();

managerRoutes.post('/create', managerController.create);
managerRoutes.delete('/delete/:id', managerController.delete);
managerRoutes.get('/getAll/:id', managerController.getAllManagerByCompany);

export default managerRoutes;
