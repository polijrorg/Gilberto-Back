-- DropForeignKey
ALTER TABLE "ModuleCompany" DROP CONSTRAINT "ModuleCompany_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleCompany" DROP CONSTRAINT "ModuleCompany_moduleId_fkey";

-- AddForeignKey
ALTER TABLE "ModuleCompany" ADD CONSTRAINT "ModuleCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleCompany" ADD CONSTRAINT "ModuleCompany_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
