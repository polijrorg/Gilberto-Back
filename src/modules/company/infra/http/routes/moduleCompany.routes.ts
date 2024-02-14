import { Router } from 'express';

import ModuleCompanyController from '../controller/ModuleCompanyController';

const moduleCompanyRoutes = Router();

const moduleCompanyController = new ModuleCompanyController();

moduleCompanyRoutes.post('/create/:companyId/:moduleId', moduleCompanyController.create);

moduleCompanyRoutes.delete('/delete/:id', moduleCompanyController.delete);

moduleCompanyRoutes.get('/getAll', moduleCompanyController.getAll);

moduleCompanyRoutes.get('/getAllCompaniesWithAModule/:moduleId', moduleCompanyController.getAllCompaniesWithAModule);

moduleCompanyRoutes.get('/getAllModulesFromACompany/:companyId', moduleCompanyController.getAllModulesFromACompany);

export default moduleCompanyRoutes;
