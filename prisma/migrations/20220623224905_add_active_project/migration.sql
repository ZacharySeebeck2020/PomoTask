-- AlterTable
ALTER TABLE `User` ADD COLUMN `activeProjectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_activeProjectId_fkey` FOREIGN KEY (`activeProjectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
