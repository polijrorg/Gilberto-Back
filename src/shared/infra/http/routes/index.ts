import { Router } from 'express';

// Supervisor
import supervisorRoutes from '@modules/supervisor/infra/http/routes/supervisor.routes';
import sessionsRoutes from '@modules/supervisor/infra/http/routes/sessions.routes';

const routes = Router();

// Users
routes.use('/supervisor', supervisorRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
