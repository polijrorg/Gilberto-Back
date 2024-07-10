import { Router } from 'express';

import CategoriesController from '../controller/CategoriesController';
import ensureAuthenticated from '../../../../../shared/infra/middlewares/EnsureAuthenticated';

const categoriesRoutes = Router();

const categoriesController = new CategoriesController();

categoriesRoutes.post('/create', categoriesController.create);

categoriesRoutes.delete('/delete/:id', categoriesController.delete);

categoriesRoutes.put('/:id', ensureAuthenticated, categoriesController.update);

categoriesRoutes.get('/getAll/:visitTemplateId', categoriesController.getAllCategoriesByVisit);

export default categoriesRoutes;
