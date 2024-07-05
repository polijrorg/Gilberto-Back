-- DropForeignKey
ALTER TABLE "ActionPlans" DROP CONSTRAINT "ActionPlans_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ActionPlans" DROP CONSTRAINT "ActionPlans_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "ActionPlans" DROP CONSTRAINT "ActionPlans_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "ActionPlans" DROP CONSTRAINT "ActionPlans_visitId_fkey";

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
