-- DropForeignKey
ALTER TABLE "QuestionsGrades" DROP CONSTRAINT "QuestionsGrades_sellerId_fkey";

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
