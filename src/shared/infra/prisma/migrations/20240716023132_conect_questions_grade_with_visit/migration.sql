/*
  Warnings:

  - Added the required column `visitId` to the `QuestionsGrades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionsGrades" ADD COLUMN     "visitId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
