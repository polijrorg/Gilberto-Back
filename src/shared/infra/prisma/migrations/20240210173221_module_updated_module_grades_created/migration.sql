/*
  Warnings:

  - You are about to drop the column `implementationScore` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `knowledgeScore` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `moduleName` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `moduleNumber` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorComment` on the `Module` table. All the data in the column will be lost.
  - Added the required column `name` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_sellerId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "implementationScore",
DROP COLUMN "knowledgeScore",
DROP COLUMN "moduleName",
DROP COLUMN "moduleNumber",
DROP COLUMN "sellerId",
DROP COLUMN "supervisorComment",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ModuleCompany" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "ModuleCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleGrades" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "implementationScore" DOUBLE PRECISION NOT NULL,
    "knowledgeScore" DOUBLE PRECISION NOT NULL,
    "supervisorComment" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleGrades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModuleCompany" ADD CONSTRAINT "ModuleCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleCompany" ADD CONSTRAINT "ModuleCompany_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
