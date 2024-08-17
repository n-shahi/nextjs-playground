-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assingedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assingedToUserId_fkey` FOREIGN KEY (`assingedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
