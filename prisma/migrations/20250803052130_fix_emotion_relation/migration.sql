/*
  Warnings:

  - You are about to drop the column `date` on the `Reflection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,date]` on the table `Emotion` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emotionId]` on the table `Reflection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Emotion" DROP CONSTRAINT "Emotion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_userId_fkey";

-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emotionId" INTEGER;

-- CreateIndex
CREATE INDEX "Emotion_userId_idx" ON "Emotion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Emotion_userId_date_key" ON "Emotion"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Reflection_emotionId_key" ON "Reflection"("emotionId");

-- CreateIndex
CREATE INDEX "Reflection_userId_idx" ON "Reflection"("userId");

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reflection" ADD CONSTRAINT "Reflection_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "Emotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emotion" ADD CONSTRAINT "Emotion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
