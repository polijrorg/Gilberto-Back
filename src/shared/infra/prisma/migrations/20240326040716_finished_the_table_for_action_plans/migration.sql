/*
  Warnings:

  - A unique constraint covering the columns `[visitId]` on the table `ActionPlans` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[moduleId]` on the table `ActionPlans` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comments` to the `ActionPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `ActionPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `ActionPlans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ActionPlans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActionPlans" ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "moduleId" TEXT,
ADD COLUMN     "prize" TEXT NOT NULL,
ADD COLUMN     "supervisorId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "visitId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ActionPlans_visitId_key" ON "ActionPlans"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "ActionPlans_moduleId_key" ON "ActionPlans"("moduleId");

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionPlans" ADD CONSTRAINT "ActionPlans_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;
