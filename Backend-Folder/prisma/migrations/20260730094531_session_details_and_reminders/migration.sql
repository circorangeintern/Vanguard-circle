-- AlterTable
ALTER TABLE "StudySession" ADD COLUMN     "description" TEXT,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "meetingLink" TEXT,
ADD COLUMN     "reminderSentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "reminderSentAt" TIMESTAMP(3);
