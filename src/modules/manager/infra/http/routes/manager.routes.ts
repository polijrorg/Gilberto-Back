import multerConfig from '@config/multer';
import { Router } from 'express';
import multer from 'multer';

import ManagerController from '../controller/ManagerController';

const managerRoutes = Router();

const managerController = new ManagerController();

managerRoutes.post('/login', managerController.login);

managerRoutes.post('/create', managerController.create);
managerRoutes.post('/csv', multer(multerConfig).single('managerCSV'), managerController.uploadCSV);

managerRoutes.delete('/delete/:id', managerController.delete);

managerRoutes.get('/getAll/:companyId', managerController.getAllManagerByCompany);

managerRoutes.get('/getAll/:directorId', managerController.getAllManagerByDirector);

managerRoutes.get('/getAll', managerController.findAll);

managerRoutes.get('/:id', managerController.findById);

managerRoutes.patch('/update/:id', managerController.update);

export default managerRoutes;
