-- DropForeignKey
ALTER TABLE "ModuleGrades" DROP CONSTRAINT "ModuleGrades_sellerId_fkey";

-- AddForeignKey
ALTER TABLE "ModuleGrades" ADD CONSTRAINT "ModuleGrades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;
