import { Router } from 'express';

import ManagerController from '../controller/ManagerController';

const managerRoutes = Router();

const managerController = new ManagerController();

managerRoutes.post('/login', managerController.login);

managerRoutes.post('/create', managerController.create);

managerRoutes.delete('/delete/:id', managerController.delete);

managerRoutes.get('/getAll/:companyId', managerController.getAllManagerByCompany);

managerRoutes.get('/getAll/:directorId', managerController.getAllManagerByDirector);

managerRoutes.patch('/update/:id', managerController.update);

export default managerRoutes;
