/*
  Warnings:

  - You are about to drop the column `grade` on the `Categories` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "grade";

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "grade";

-- AlterTable
ALTER TABLE "VisitTemplate" ALTER COLUMN "managerId" DROP NOT NULL,
ALTER COLUMN "directorId" DROP NOT NULL;
