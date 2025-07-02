-- CreateTable
CREATE TABLE "credits" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credits_pkey" PRIMARY KEY ("id")
);
