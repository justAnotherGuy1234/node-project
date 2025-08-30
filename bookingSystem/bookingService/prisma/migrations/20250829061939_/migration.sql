/*
  Warnings:

  - You are about to drop the column `indempotencyKey` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idempotencyKey` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_indempotencyKey_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `indempotencyKey`,
    ADD COLUMN `idempotencyKey` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_idempotencyKey_key` ON `Booking`(`idempotencyKey`);
