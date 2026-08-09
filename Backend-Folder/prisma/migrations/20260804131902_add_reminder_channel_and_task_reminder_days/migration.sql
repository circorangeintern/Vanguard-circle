-- CreateEnum
CREATE TYPE "ReminderChannel" AS ENUM ('IN_APP', 'EMAIL', 'WHATSAPP', 'SMS');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "reminderChannel" "ReminderChannel" NOT NULL DEFAULT 'IN_APP';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "reminderDaysBefore" INTEGER;
