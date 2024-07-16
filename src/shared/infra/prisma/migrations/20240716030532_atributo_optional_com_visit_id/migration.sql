-- AlterTable
ALTER TABLE "QuestionsGrades" ADD COLUMN     "visitId" TEXT;

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
