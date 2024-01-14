-- CreateTable
CREATE TABLE "Match2022" (
    "matchNumber" INTEGER NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "scouterName" TEXT NOT NULL,
    "autoTaxi" BOOLEAN NOT NULL,
    "autoLow" INTEGER NOT NULL,
    "autoLowMissed" INTEGER NOT NULL,
    "autoHigh" INTEGER NOT NULL,
    "autoHighMissed" INTEGER NOT NULL,
    "teleopLow" INTEGER NOT NULL,
    "teleopLowMissed" INTEGER NOT NULL,
    "teleopHigh" INTEGER NOT NULL,
    "teleopHighMissed" INTEGER NOT NULL,
    "climbAttempt" BOOLEAN NOT NULL,
    "climbLow" BOOLEAN NOT NULL,
    "climbMid" BOOLEAN NOT NULL,
    "climbHigh" BOOLEAN NOT NULL,
    "climbTraverse" BOOLEAN NOT NULL,
    "climbTime" DOUBLE PRECISION,

    CONSTRAINT "Match2022_pkey" PRIMARY KEY ("matchNumber","teamNumber")
);
