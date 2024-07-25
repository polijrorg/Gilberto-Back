-- DropForeignKey
ALTER TABLE "QuestionsGrades" DROP CONSTRAINT "QuestionsGrades_questionsId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsGrades" DROP CONSTRAINT "QuestionsGrades_visitId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_visitTemplateId_fkey";

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_visitTemplateId_fkey" FOREIGN KEY ("visitTemplateId") REFERENCES "VisitTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
