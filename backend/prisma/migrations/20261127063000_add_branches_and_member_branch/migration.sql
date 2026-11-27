-- CreateTable
CREATE TABLE `branches` (
    `id` VARCHAR(191) NOT NULL,
    `business_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(191) NULL,
    `is_main` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `branches_business_id_idx`(`business_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `business_members` ADD COLUMN `branch_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `business_members_branch_id_idx` ON `business_members`(`branch_id`);

-- AddForeignKey
ALTER TABLE `branches` ADD CONSTRAINT `branches_business_id_fkey` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `business_members` ADD CONSTRAINT `business_members_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Backfill: Buat cabang utama untuk setiap bisnis yang sudah ada tanpa menghapus data lama
INSERT INTO `branches` (`id`, `business_id`, `name`, `code`, `address`, `phone`, `is_main`, `is_active`, `created_at`)
SELECT UUID(), `id`, `name`, 'Cabang Utama #04', `address`, `phone_business`, true, true, CURRENT_TIMESTAMP(3)
FROM `businesses`;

-- Backfill: Tautkan anggota tim (karyawan) yang sudah ada ke cabang utama bisnisnya
UPDATE `business_members` bm
INNER JOIN `branches` b ON b.`business_id` = bm.`business_id` AND b.`is_main` = true
SET bm.`branch_id` = b.`id`
WHERE bm.`branch_id` IS NULL;
