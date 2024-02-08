/*
  Warnings:

  - Added the required column `companyId` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Supervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
