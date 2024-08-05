import { Router } from 'express';

import multerConfig from '@config/multer';
import multer from 'multer';
import CompanyController from '../controller/CompanyController';

const companyRoutes = Router();

const companyController = new CompanyController();

companyRoutes.post('/create', companyController.create);
companyRoutes.post('/csv', multer(multerConfig).single('companyCSV'), companyController.uploadCSV);

companyRoutes.delete('/delete/:id', companyController.delete);

companyRoutes.get('/getAll', companyController.getAll);

companyRoutes.get('/:id', companyController.findById);

companyRoutes.patch('/update/:id', companyController.update);

export default companyRoutes;
