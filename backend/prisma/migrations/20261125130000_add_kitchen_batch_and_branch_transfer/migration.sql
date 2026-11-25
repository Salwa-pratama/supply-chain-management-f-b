-- DropForeignKey
ALTER TABLE `bots` DROP FOREIGN KEY `bots_business_id_fkey`;

-- DropForeignKey
ALTER TABLE `chat_sessions` DROP FOREIGN KEY `chat_sessions_bot_id_fkey`;

-- DropForeignKey
ALTER TABLE `chat_sessions` DROP FOREIGN KEY `chat_sessions_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `customers_business_id_fkey`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_session_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_session_id_fkey`;

-- DropIndex
DROP INDEX `customers_business_id_wa_phone_number_key` ON `customers`;

-- DropIndex
DROP INDEX `orders_session_id_key` ON `orders`;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `wa_phone_number`,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ingredients` ADD COLUMN `expiry_date` DATETIME(3) NULL,
    ADD COLUMN `location_rack` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `session_id`,
    ADD COLUMN `change_amount` DECIMAL(12, 2) NULL DEFAULT 0,
    ADD COLUMN `discount_amount` DECIMAL(12, 2) NULL DEFAULT 0,
    ADD COLUMN `order_type` VARCHAR(191) NOT NULL DEFAULT 'dine-in',
    ADD COLUMN `paid_amount` DECIMAL(12, 2) NULL DEFAULT 0,
    ADD COLUMN `payment_method` VARCHAR(191) NULL DEFAULT 'cash',
    ADD COLUMN `tax_amount` DECIMAL(12, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `purchase_orders` ADD COLUMN `delivery_note` VARCHAR(191) NULL,
    ADD COLUMN `driver_info` VARCHAR(191) NULL,
    ADD COLUMN `qc_notes` TEXT NULL,
    ADD COLUMN `qc_status` VARCHAR(191) NULL DEFAULT 'pending',
    ADD COLUMN `received_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `bots`;

-- DropTable
DROP TABLE `chat_sessions`;

-- DropTable
DROP TABLE `messages`;

-- CreateTable
CREATE TABLE `kitchen_batches` (
    `id` VARCHAR(191) NOT NULL,
    `business_id` VARCHAR(191) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `batch_number` VARCHAR(191) NOT NULL,
    `recipe_name` VARCHAR(191) NOT NULL,
    `station` VARCHAR(191) NULL,
    `operator` VARCHAR(191) NULL,
    `planned_yield` VARCHAR(191) NULL,
    `actual_yield` VARCHAR(191) NULL,
    `progress` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'in_progress',
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed_at` DATETIME(3) NULL,

    INDEX `kitchen_batches_business_id_idx`(`business_id`),
    INDEX `kitchen_batches_created_by_id_idx`(`created_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kitchen_batch_items` (
    `id` VARCHAR(191) NOT NULL,
    `batch_id` VARCHAR(191) NOT NULL,
    `ingredient_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(12, 3) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,

    INDEX `kitchen_batch_items_batch_id_idx`(`batch_id`),
    INDEX `kitchen_batch_items_ingredient_id_idx`(`ingredient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch_transfers` (
    `id` VARCHAR(191) NOT NULL,
    `business_id` VARCHAR(191) NOT NULL,
    `created_by_id` VARCHAR(191) NULL,
    `transfer_number` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `driver` VARCHAR(191) NULL,
    `vehicle_info` VARCHAR(191) NULL,
    `departure_time` VARCHAR(191) NULL,
    `eta` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'shipping',
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `received_at` DATETIME(3) NULL,

    INDEX `branch_transfers_business_id_idx`(`business_id`),
    INDEX `branch_transfers_created_by_id_idx`(`created_by_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `branch_transfer_items` (
    `id` VARCHAR(191) NOT NULL,
    `transfer_id` VARCHAR(191) NOT NULL,
    `ingredient_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(12, 3) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,

    INDEX `branch_transfer_items_transfer_id_idx`(`transfer_id`),
    INDEX `branch_transfer_items_ingredient_id_idx`(`ingredient_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `customers_business_id_idx` ON `customers`(`business_id`);

-- AddForeignKey
ALTER TABLE `kitchen_batches` ADD CONSTRAINT `kitchen_batches_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kitchen_batches` ADD CONSTRAINT `kitchen_batches_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kitchen_batch_items` ADD CONSTRAINT `kitchen_batch_items_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `kitchen_batches`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kitchen_batch_items` ADD CONSTRAINT `kitchen_batch_items_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch_transfers` ADD CONSTRAINT `branch_transfers_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch_transfers` ADD CONSTRAINT `branch_transfers_created_by_id_fkey` FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch_transfer_items` ADD CONSTRAINT `branch_transfer_items_transfer_id_fkey` FOREIGN KEY (`transfer_id`) REFERENCES `branch_transfers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `branch_transfer_items` ADD CONSTRAINT `branch_transfer_items_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
