/*
  Warnings:

  - The `stage` column on the `Seller` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "stage",
ADD COLUMN     "stage" "Stage" NOT NULL DEFAULT E'Pendente';
