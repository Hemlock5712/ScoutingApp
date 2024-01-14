/*
  Warnings:

  - The primary key for the `Match2022` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Match2022" DROP CONSTRAINT "Match2022_pkey",
ADD COLUMN     "eventName" TEXT NOT NULL DEFAULT '',
ADD CONSTRAINT "Match2022_pkey" PRIMARY KEY ("eventName", "matchNumber", "teamNumber");
