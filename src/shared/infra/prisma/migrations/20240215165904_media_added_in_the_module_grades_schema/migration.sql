/*
  Warnings:

  - Added the required column `media` to the `ModuleGrades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModuleGrades" ADD COLUMN     "media" DOUBLE PRECISION NOT NULL;
