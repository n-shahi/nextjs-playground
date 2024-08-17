/*
  Warnings:

  - You are about to drop the column `assingedToUserId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_assingedToUserId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `assingedToUserId`,
    ADD COLUMN `assignToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignToUserId_fkey` FOREIGN KEY (`assignToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
