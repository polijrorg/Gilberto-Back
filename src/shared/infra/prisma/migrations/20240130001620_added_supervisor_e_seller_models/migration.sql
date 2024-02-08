/*
  Warnings:

  - You are about to drop the column `email` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `image` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supervisorId` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "email",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "supervisorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Supervisor" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supervisor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
