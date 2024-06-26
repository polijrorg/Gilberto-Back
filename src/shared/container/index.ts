import { container } from 'tsyringe';

import './providers';

import SupervisorRepository from '@modules/supervisor/infra/prisma/repositories/SupervisorRepository';
import ISupervisorRepository from '@modules/supervisor/repositories/ISupervisorRepository';

import ISellerRepository from '@modules/seller/repositories/ISellerRepository';
import SellerRepository from '@modules/seller/infra/prisma/repositories/SellerRepository';

import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/prisma/repositories/CompanyRepository';

import IManagerRepository from '@modules/manager/repositories/IManagerRepository';
import ManagerRepository from '@modules/manager/infra/prisma/repositories/ManagerRepository';

import IModuleRepository from '@modules/module/repositories/IModuleRepository';
import ModuleRepository from '@modules/module/infra/prisma/repositories/ModuleRepository';

import IModuleGradesRepository from '@modules/module/repositories/IModuleGradesRepository';
import ModuleGradesRepository from '@modules/module/infra/prisma/repositories/ModuleGradesRepository';

import IModuleCompanyRepository from '@modules/company/repositories/IModuleCompanyRepository';
import ModuleCompanyRepository from '@modules/company/infra/prisma/repositories/ModuleCompanyRepository';

import IDirectorRepository from '@modules/director/repositories/IDirectorRepository';
import DirectorRepository from '@modules/director/infra/prisma/repositories/DirectorRepository';

import IVisitTemplateRepository from '@modules/visitTemplate/repositories/IVisitTemplateRepository';
import VisitTemplateRepository from '@modules/visitTemplate/infra/prisma/repositories/VisitTemplateRepository';

import ICategoriesRepository from '@modules/visitTemplate/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/visitTemplate/infra/prisma/repositories/CategoriesRepository';

import IQuestionsRepository from '@modules/visitTemplate/repositories/IQuestionsRepository';
import QuestionsRepository from '@modules/visitTemplate/infra/prisma/repositories/QuestionsRepository';

import IQuestionsGradesRepository from '@modules/visitTemplate/repositories/IQuestionsGradesRepository';
import QuestionsGradesRepository from '@modules/visitTemplate/infra/prisma/repositories/QuestionsGradesRepository';

import IVisitRepository from '@modules/visit/repositories/IVisitRepository';
import VisitRepository from '@modules/visit/infra/prisma/repositories/VisitRepository';

import IActionPlansRepository from '@modules/actionPlans/repositories/IActionPlansRepository';
import ActionPlansRepository from '@modules/actionPlans/infra/prisma/repositories/ActionPlansRepository';

container.registerSingleton<ISupervisorRepository>('SupervisorRepository', SupervisorRepository);

container.registerSingleton<ISellerRepository>('SellerRepository', SellerRepository);

container.registerSingleton<ICompanyRepository>('CompanyRepository', CompanyRepository);

container.registerSingleton<IManagerRepository>('ManagerRepository', ManagerRepository);

container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository);
container.registerSingleton<IModuleGradesRepository>('ModuleGradesRepository', ModuleGradesRepository);
container.registerSingleton<IModuleCompanyRepository>('ModuleCompanyRepository', ModuleCompanyRepository);

container.registerSingleton<IDirectorRepository>('DirectorRepository', DirectorRepository);

container.registerSingleton<IVisitTemplateRepository>('VisitTemplateRepository', VisitTemplateRepository);
container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);
container.registerSingleton<IQuestionsRepository>('QuestionsRepository', QuestionsRepository);
container.registerSingleton<IQuestionsGradesRepository>('QuestionsGradesRepository', QuestionsGradesRepository);

container.registerSingleton<IVisitRepository>('VisitRepository', VisitRepository);

container.registerSingleton<IActionPlansRepository>('ActionPlansRepository', ActionPlansRepository);
