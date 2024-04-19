-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('Pendente', 'Mentoria', 'Visita');

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "stage" TEXT NOT NULL DEFAULT E'Pendente';
