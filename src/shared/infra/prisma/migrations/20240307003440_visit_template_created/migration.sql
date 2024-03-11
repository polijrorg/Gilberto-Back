/*
  Warnings:

  - You are about to drop the column `visitId` on the `Categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visitTemplateId]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visitTemplateId` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitTemplateId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_visitId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "visitId",
ADD COLUMN     "visitTemplateId" TEXT NOT NULL,
ALTER COLUMN "grade" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "grade" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "visitTemplateId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VisitTemplate" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "managerId" TEXT NOT NULL,
    "directorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitTemplate_companyId_key" ON "VisitTemplate"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "VisitTemplate_managerId_key" ON "VisitTemplate"("managerId");

-- CreateIndex
CREATE UNIQUE INDEX "VisitTemplate_directorId_key" ON "VisitTemplate"("directorId");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_visitTemplateId_key" ON "Visit"("visitTemplateId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_visitTemplateId_fkey" FOREIGN KEY ("visitTemplateId") REFERENCES "VisitTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitTemplate" ADD CONSTRAINT "VisitTemplate_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitTemplate" ADD CONSTRAINT "VisitTemplate_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitTemplate" ADD CONSTRAINT "VisitTemplate_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_visitTemplateId_fkey" FOREIGN KEY ("visitTemplateId") REFERENCES "VisitTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
