import multerConfig from '@config/multer';
import { Router } from 'express';
import multer from 'multer';

import DirectorController from '../controller/DirectorController';

const directorRoutes = Router();

const directorController = new DirectorController();

directorRoutes.post('/login', directorController.login);

directorRoutes.post('/admin', directorController.adminLogin);

directorRoutes.post('/create', directorController.create);
directorRoutes.post('/csv', multer(multerConfig).single('directorCSV'), directorController.uploadCSV);

directorRoutes.delete('/delete/:id', directorController.delete);

directorRoutes.get('/getAll/:companyId', directorController.getAllDirectorByCompany);

directorRoutes.get('/getAll', directorController.findAll);

directorRoutes.get('/:id', directorController.findById);

directorRoutes.patch('/update/:id', directorController.update);

export default directorRoutes;
