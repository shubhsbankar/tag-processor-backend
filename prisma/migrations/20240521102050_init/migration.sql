-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "encData" TEXT NOT NULL,
    "readCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_uid_key" ON "Tag"("uid");
