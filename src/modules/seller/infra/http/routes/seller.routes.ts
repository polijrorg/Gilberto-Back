import { Router } from 'express';

import SellerController from '../controller/SellerController';

const sellerRoutes = Router();

const sellerController = new SellerController();

sellerRoutes.post('/create', sellerController.create);

sellerRoutes.delete('/delete/:id', sellerController.delete);

sellerRoutes.get('/getAllFromASupervisor/:supervisorId', sellerController.getAllFromASupervisor);

sellerRoutes.get('/getAllFromAManager/:managerId', sellerController.getAllFromAManager);

sellerRoutes.get('/getAllFromADirector/:directorId', sellerController.getAllFromADirector);

sellerRoutes.get('/getAllFromACompany/:companyId', sellerController.getAllFromACompany);

sellerRoutes.patch('/update/:id', sellerController.update);

export default sellerRoutes;
