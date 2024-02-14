-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "job" TEXT NOT NULL DEFAULT E'Gerente';

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "job" TEXT NOT NULL DEFAULT E'Vendedor';

-- AlterTable
ALTER TABLE "Supervisor" ADD COLUMN     "job" TEXT NOT NULL DEFAULT E'Supervisor';
