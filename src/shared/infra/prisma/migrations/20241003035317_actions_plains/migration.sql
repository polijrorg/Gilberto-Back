/*
  Warnings:

  - A unique constraint covering the columns `[sellerId,moduleId]` on the table `ActionPlans` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ActionPlans_moduleId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ActionPlans_sellerId_moduleId_key" ON "ActionPlans"("sellerId", "moduleId");
