-- AlterTable
ALTER TABLE `kitchen_batches`
    ADD COLUMN `product_id` VARCHAR(191) NULL,
    ADD COLUMN `target_qty` INTEGER NULL;

-- CreateIndex
CREATE INDEX `kitchen_batches_product_id_idx` ON `kitchen_batches`(`product_id`);

-- AddForeignKey
ALTER TABLE `kitchen_batches` ADD CONSTRAINT `kitchen_batches_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
