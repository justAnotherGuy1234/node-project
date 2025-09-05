-- CreateTable
CREATE TABLE `RoomBooked` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hotel` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `pricePayed` DECIMAL(8, 2) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `roomType` ENUM('SINGLE', 'DOUBLE', 'FAMILY') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomBooked` ADD CONSTRAINT `RoomBooked_hotel_fkey` FOREIGN KEY (`hotel`) REFERENCES `Hotel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
