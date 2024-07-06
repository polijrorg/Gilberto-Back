import { Router } from 'express';

import VisitTemplateController from '../controller/VisitTemplateController';

const visitTemplateRoutes = Router();

const visitTemplateController = new VisitTemplateController();

visitTemplateRoutes.post('/create', visitTemplateController.create);

visitTemplateRoutes.delete('/delete/:id', visitTemplateController.delete);

visitTemplateRoutes.get('/getByCompany/:companyId', visitTemplateController.getVisitByCompany);

visitTemplateRoutes.get('/getByManager/:managerId', visitTemplateController.getVisitByManager);

visitTemplateRoutes.get('/getByDirector/:directorId', visitTemplateController.getVisitByDirector);

visitTemplateRoutes.put('/update/:id', visitTemplateController.update);

export default visitTemplateRoutes;
