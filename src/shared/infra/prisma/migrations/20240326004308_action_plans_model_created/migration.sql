-- CreateTable
CREATE TABLE "ActionPlans" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActionPlans_pkey" PRIMARY KEY ("id")
);
