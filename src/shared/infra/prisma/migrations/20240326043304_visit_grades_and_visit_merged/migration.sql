/*
  Warnings:

  - You are about to drop the `VisitGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitGrades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VisitGrade" DROP CONSTRAINT "VisitGrade_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "VisitGrade" DROP CONSTRAINT "VisitGrade_visitId_fkey";

-- DropForeignKey
ALTER TABLE "VisitGrades" DROP CONSTRAINT "VisitGrades_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "VisitGrades" DROP CONSTRAINT "VisitGrades_visitId_fkey";

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "comments" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "grade" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "VisitGrade";

-- DropTable
DROP TABLE "VisitGrades";
