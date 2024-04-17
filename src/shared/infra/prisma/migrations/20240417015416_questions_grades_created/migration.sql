-- CreateTable
CREATE TABLE "QuestionsGrades" (
    "id" TEXT NOT NULL,
    "grade" DOUBLE PRECISION NOT NULL,
    "questionsId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionsGrades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsGrades" ADD CONSTRAINT "QuestionsGrades_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
