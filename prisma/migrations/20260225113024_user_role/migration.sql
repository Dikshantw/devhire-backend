-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SEEKER', 'RECRUITER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SEEKER';
