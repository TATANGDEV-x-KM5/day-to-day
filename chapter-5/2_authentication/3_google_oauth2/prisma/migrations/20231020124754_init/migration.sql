/*
  Warnings:

  - You are about to drop the column `gooleid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gooleid",
ADD COLUMN     "googleid" TEXT;
