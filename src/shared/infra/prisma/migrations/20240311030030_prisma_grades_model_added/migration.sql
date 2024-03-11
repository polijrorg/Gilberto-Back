-- CreateTable
CREATE TABLE "VisitGrade" (
    "id" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "VisitGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitGrades" (
    "id" TEXT NOT NULL,
    "grade" INTEGER NOT NULL DEFAULT 0,
    "comments" TEXT NOT NULL,
    "visitId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "VisitGrades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitGrade_visitId_key" ON "VisitGrade"("visitId");

-- CreateIndex
CREATE UNIQUE INDEX "VisitGrades_visitId_key" ON "VisitGrades"("visitId");

-- AddForeignKey
ALTER TABLE "VisitGrade" ADD CONSTRAINT "VisitGrade_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitGrade" ADD CONSTRAINT "VisitGrade_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitGrades" ADD CONSTRAINT "VisitGrades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisitGrades" ADD CONSTRAINT "VisitGrades_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
