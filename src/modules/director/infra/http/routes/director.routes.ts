import { Router } from 'express';

import DirectorController from '../controller/DirectorController';

const directorRoutes = Router();

const directorController = new DirectorController();

directorRoutes.post('/login', directorController.login);

directorRoutes.post('/create', directorController.create);

directorRoutes.delete('/delete/:id', directorController.delete);

directorRoutes.get('/getAll/:id', directorController.getAllDirectorByCompany);

directorRoutes.patch('/update/:id', directorController.update);

export default directorRoutes;
