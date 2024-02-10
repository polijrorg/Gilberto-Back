import { Router } from 'express';

import supervisorRoutes from '@modules/supervisor/infra/http/routes/supervisor.routes';
import sellerRoutes from '@modules/seller/infra/http/routes/seller.routes';
import companyRoutes from '@modules/company/infra/http/routes/company.routes';
import managerRoutes from '@modules/manager/infra/http/routes/manager.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';
import moduleGradesRoutes from '@modules/module/infra/http/routes/moduleGrades.routes';

const routes = Router();

// Supervisor
routes.use('/supervisor', supervisorRoutes);

// Seller
routes.use('/seller', sellerRoutes);

// Company
routes.use('/company', companyRoutes);

// Manager
routes.use('/manager', managerRoutes);

// Module and ModuleGrades
routes.use('/module', moduleRoutes);
routes.use('/moduleGrades', moduleGradesRoutes);

export default routes;
