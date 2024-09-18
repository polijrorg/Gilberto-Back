import multerConfig from '@config/multer';
import { Router } from 'express';
import multer from 'multer';

import SellerController from '../controller/SellerController';

const sellerRoutes = Router();

const sellerController = new SellerController();

sellerRoutes.post('/create', sellerController.create);
sellerRoutes.post('/csv', multer(multerConfig).single('sellerCSV'), sellerController.uploadCSV);

sellerRoutes.delete('/delete/:id', sellerController.delete);

sellerRoutes.get('/getAllFromASupervisor/:supervisorId', sellerController.getAllFromASupervisor);

sellerRoutes.get('/getPendenteFromASupervisor/:supervisorId', sellerController.getAllPendenteFromASupervisor);
sellerRoutes.get('/getVisitaFromASupervisor/:supervisorId', sellerController.getAllVisitaFromASupervisor);
sellerRoutes.get('/getMentoriaFromASupervisor/:supervisorId', sellerController.getAllMentoriaFromASupervisor);

sellerRoutes.get('/getAllFromAManager/:managerId', sellerController.getAllFromAManager);

sellerRoutes.get('/getAllFromADirector/:directorId', sellerController.getAllFromADirector);
sellerRoutes.get('/generatePdf/:sellerId/:dateVisit', sellerController.generatePdf);

sellerRoutes.get('/getAllFromACompany/:companyId', sellerController.getAllFromACompany);

sellerRoutes.get('/getManagerAndDirectorFromSeller/:idSeller', sellerController.getManagerAndDirectorFromSeller);

sellerRoutes.get('/:id', sellerController.findById);

sellerRoutes.get('/', sellerController.getAll);

sellerRoutes.patch('/update/:id', sellerController.update);

export default sellerRoutes;
