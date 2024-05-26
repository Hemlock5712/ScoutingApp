-- CreateTable
CREATE TABLE "Match2024" (
    "eventName" TEXT NOT NULL DEFAULT '',
    "matchNumber" INTEGER NOT NULL,
    "teamNumber" INTEGER NOT NULL,
    "scouterName" TEXT NOT NULL,
    "autoAmpHit" INTEGER NOT NULL,
    "autoAmpMissed" INTEGER NOT NULL,
    "autoSpeakerHit" INTEGER NOT NULL,
    "autoSpeakerMissed" INTEGER NOT NULL,
    "autoLeave" BOOLEAN NOT NULL,
    "teleSpeakerHit" INTEGER NOT NULL,
    "teleSpeakerMissed" INTEGER NOT NULL,
    "teleAmpHit" INTEGER NOT NULL,
    "teleAmpMissed" INTEGER NOT NULL,
    "climbAttempt" BOOLEAN NOT NULL,
    "climbSuccess" BOOLEAN NOT NULL,
    "trap" INTEGER NOT NULL,

    CONSTRAINT "Match2024_pkey" PRIMARY KEY ("eventName","matchNumber","teamNumber")
);
