import { Router } from 'express';

import supervisorRoutes from '@modules/supervisor/infra/http/routes/supervisor.routes';
import sellerRoutes from '@modules/seller/infra/http/routes/seller.routes';
import sessionsRoutes from '@modules/supervisor/infra/http/routes/sessions.routes';

const routes = Router();

// Supervisor
routes.use('/supervisor', supervisorRoutes);
routes.use('/sessions', sessionsRoutes);

// Seller
routes.use('/seller', sellerRoutes);

export default routes;
