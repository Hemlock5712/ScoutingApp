/*
  Warnings:

  - Added the required column `harmony` to the `Match2024` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match2024" ADD COLUMN     "harmony" BOOLEAN NOT NULL;
