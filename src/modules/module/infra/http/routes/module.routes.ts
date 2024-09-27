import { Router } from 'express';

import ModuleController from '../controller/ModuleController';

const moduleRoutes = Router();

const moduleController = new ModuleController();

moduleRoutes.post('/create', moduleController.create);

moduleRoutes.delete('/delete/:id', moduleController.delete);

moduleRoutes.get('/getAll', moduleController.getAllModule);

moduleRoutes.get('/getAllModuleInfo/:id', moduleController.getAllModuleInfo);

moduleRoutes.patch('/update/:id', moduleController.update);
moduleRoutes.get('/:id', moduleController.getByIdModule);

export default moduleRoutes;
