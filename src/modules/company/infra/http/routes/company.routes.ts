import { Router } from 'express';

import CompanyController from '../controller/CompanyController';

const companyRoutes = Router();

const companyController = new CompanyController();

companyRoutes.post('/create', companyController.create);

companyRoutes.delete('/delete/:id', companyController.delete);

companyRoutes.get('/getAll', companyController.getAll);

companyRoutes.get('/:id', companyController.findById);

companyRoutes.patch('/update/:id', companyController.update);

export default companyRoutes;
