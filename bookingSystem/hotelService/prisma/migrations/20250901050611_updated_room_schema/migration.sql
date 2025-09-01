/*
  Warnings:

  - Added the required column `dataOfAvailability` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCount` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Room` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dataOfAvailability` DATETIME(3) NOT NULL,
    ADD COLUMN `price` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `roomCount` INTEGER NOT NULL,
    ADD COLUMN `roomType` ENUM('SINGLE', 'DOUBLE', 'FAMILY') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
