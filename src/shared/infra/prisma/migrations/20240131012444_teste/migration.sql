/*
  Warnings:

  - You are about to drop the column `password` on the `Supervisor` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Supervisor" DROP COLUMN "password";

-- DropTable
DROP TABLE "Users";
