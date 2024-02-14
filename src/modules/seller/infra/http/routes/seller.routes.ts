import { Router } from 'express';

import SellerController from '../controller/SellerController';

const sellerRoutes = Router();

const sellerController = new SellerController();

sellerRoutes.post('/create', sellerController.create);

sellerRoutes.delete('/delete/:id', sellerController.delete);

sellerRoutes.get('/getAll/:id', sellerController.getAll);

sellerRoutes.patch('/update/:id', sellerController.update);

export default sellerRoutes;
