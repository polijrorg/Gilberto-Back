import { Router } from 'express';

import supervisorRoutes from '@modules/supervisor/infra/http/routes/supervisor.routes';
import sellerRoutes from '@modules/seller/infra/http/routes/seller.routes';
import companyRoutes from '@modules/company/infra/http/routes/company.routes';
import managerRoutes from '@modules/manager/infra/http/routes/manager.routes';
import moduleRoutes from '@modules/module/infra/http/routes/module.routes';
import moduleGradesRoutes from '@modules/module/infra/http/routes/moduleGrades.routes';
import moduleCompanyRoutes from '@modules/company/infra/http/routes/moduleCompany.routes';
import directorRoutes from '@modules/director/infra/http/routes/director.routes';

const routes = Router();

// Supervisor
routes.use('/supervisor', supervisorRoutes);

// Seller
routes.use('/seller', sellerRoutes);

// Company and ModuleCompany
routes.use('/company', companyRoutes);
routes.use('/moduleCompany', moduleCompanyRoutes);

// Manager
routes.use('/manager', managerRoutes);

// Director
routes.use('/director', directorRoutes);

// Module and ModuleGrades
routes.use('/module', moduleRoutes);
routes.use('/moduleGrades', moduleGradesRoutes);

export default routes;
