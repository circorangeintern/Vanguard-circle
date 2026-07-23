-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "allowMemberInvites" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "approval" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "maxMembers" INTEGER,
ADD COLUMN     "reminderFrequency" TEXT NOT NULL DEFAULT 'Every day',
ADD COLUMN     "reminderTime" TEXT NOT NULL DEFAULT '09:00 AM',
ADD COLUMN     "requireAdminApproval" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "studyReminders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "visibility" TEXT NOT NULL DEFAULT 'private';

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "invitedBy" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
