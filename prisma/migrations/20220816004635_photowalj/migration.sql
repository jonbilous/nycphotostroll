/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('photowalk');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "eventId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_uid_key" ON "Event"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Image_uid_key" ON "Image"("uid");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
