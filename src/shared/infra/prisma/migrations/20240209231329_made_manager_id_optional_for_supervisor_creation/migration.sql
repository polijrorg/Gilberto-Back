-- DropForeignKey
ALTER TABLE "Supervisor" DROP CONSTRAINT "Supervisor_managerId_fkey";

-- AlterTable
ALTER TABLE "Supervisor" ALTER COLUMN "managerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Supervisor" ADD CONSTRAINT "Supervisor_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
