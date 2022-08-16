-- CreateEnum
CREATE TYPE "ImageStatus" AS ENUM ('uploading', 'published');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "status" "ImageStatus" NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");
