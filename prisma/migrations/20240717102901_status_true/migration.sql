/*
  Warnings:

  - Added the required column `collector_id` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `collector` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `company` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `payment` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `paymenthistory` ADD COLUMN `collector_id` INTEGER NOT NULL,
    MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `region` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `shop` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `PaymentHistory` ADD CONSTRAINT `PaymentHistory_collector_id_fkey` FOREIGN KEY (`collector_id`) REFERENCES `Collector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
