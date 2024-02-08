-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "moduleNumber" INTEGER NOT NULL,
    "moduleName" TEXT NOT NULL,
    "implementationScore" DOUBLE PRECISION NOT NULL,
    "knowledgeScore" DOUBLE PRECISION NOT NULL,
    "supervisorComment" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "storeVisited" TEXT NOT NULL,
    "dateVisited" TIMESTAMP(3) NOT NULL,
    "sellerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
