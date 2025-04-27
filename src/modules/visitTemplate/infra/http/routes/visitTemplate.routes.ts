import { Router } from 'express';

import VisitTemplateController from '../controller/VisitTemplateController';

const visitTemplateRoutes = Router();

const visitTemplateController = new VisitTemplateController();

visitTemplateRoutes.post('/create', visitTemplateController.create);

visitTemplateRoutes.delete('/delete/:id', visitTemplateController.delete);

visitTemplateRoutes.post('/selectForCompany/', visitTemplateController.selectForCompany);
visitTemplateRoutes.get('/getByCompany/:companyId', visitTemplateController.getVisitByCompany);
visitTemplateRoutes.get('/getSelectedByCompany/:companyId', visitTemplateController.getSelectedVisitByCompany);

visitTemplateRoutes.post('/selectForManager/', visitTemplateController.selectForManager);
visitTemplateRoutes.get('/getByManager/:managerId', visitTemplateController.getVisitByManager);
visitTemplateRoutes.get('/getSelectedByManager/:managerId', visitTemplateController.getSelectedVisitByManager);

visitTemplateRoutes.post('/selectForDirector/', visitTemplateController.selectForDirector);
visitTemplateRoutes.get('/getByDirector/:directorId', visitTemplateController.getVisitByDirector);
visitTemplateRoutes.get('/getSelectedByDirector/:directorId', visitTemplateController.getSelectedVisitByDirector);

visitTemplateRoutes.put('/update/:id', visitTemplateController.update);

export default visitTemplateRoutes;
