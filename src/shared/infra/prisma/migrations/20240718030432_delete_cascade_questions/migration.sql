-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_categoriesId_fkey";

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
