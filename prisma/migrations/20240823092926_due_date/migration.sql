/*
  Warnings:

  - Added the required column `due_date` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_collector_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_company_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_shop_id_fkey`;

-- DropForeignKey
ALTER TABLE `paymenthistory` DROP FOREIGN KEY `PaymentHistory_collector_id_fkey`;

-- DropForeignKey
ALTER TABLE `paymenthistory` DROP FOREIGN KEY `PaymentHistory_payment_id_fkey`;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `due_date` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_collector_id_fkey` FOREIGN KEY (`collector_id`) REFERENCES `Collector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentHistory` ADD CONSTRAINT `PaymentHistory_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentHistory` ADD CONSTRAINT `PaymentHistory_collector_id_fkey` FOREIGN KEY (`collector_id`) REFERENCES `Collector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
