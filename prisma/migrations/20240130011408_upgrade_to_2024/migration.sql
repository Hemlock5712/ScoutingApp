/*
  Warnings:

  - You are about to drop the column `climbAttempt` on the `Match2024` table. All the data in the column will be lost.
  - You are about to drop the column `climbSuccess` on the `Match2024` table. All the data in the column will be lost.
  - Added the required column `autoPickedUpFromMiddle` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `climb` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floorPickup` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanPlayerAtAmp` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanPlayerHighNotesHit` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanPlayerHighNotesMissed` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `park` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourcePickup` to the `Match2024` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trapMiss` to the `Match2024` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match2024" DROP COLUMN "climbAttempt",
DROP COLUMN "climbSuccess",
ADD COLUMN     "autoPickedUpFromMiddle" INTEGER NOT NULL,
ADD COLUMN     "climb" BOOLEAN NOT NULL,
ADD COLUMN     "floorPickup" BOOLEAN NOT NULL,
ADD COLUMN     "humanPlayerAtAmp" BOOLEAN NOT NULL,
ADD COLUMN     "humanPlayerHighNotesHit" INTEGER NOT NULL,
ADD COLUMN     "humanPlayerHighNotesMissed" INTEGER NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "park" BOOLEAN NOT NULL,
ADD COLUMN     "sourcePickup" BOOLEAN NOT NULL,
ADD COLUMN     "trapMiss" INTEGER NOT NULL;
