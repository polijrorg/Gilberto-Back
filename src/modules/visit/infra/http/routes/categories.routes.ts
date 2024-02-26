import { Router } from 'express';

import CategoriesController from '../controller/CategoriesController';

const categoriesRoutes = Router();

const categoriesController = new CategoriesController();

categoriesRoutes.post('/create', categoriesController.create);

categoriesRoutes.delete('/delete/:id', categoriesController.delete);

categoriesRoutes.get('/getAll/:visitId', categoriesController.getAllCategoriesByVisit);

export default categoriesRoutes;
