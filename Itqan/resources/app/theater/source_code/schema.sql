-- ========================================================
-- قاعدة بيانات نظام حجز مقاعد المسرح وبطاقات الـ QR Code
-- Theater Seat Reservations & Beneficiary Portal Database
-- متوافقة مع MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.2+
-- الترميز: utf8mb4_unicode_ci لدعم كامل للغة العربية والرموز
-- ========================================================

CREATE DATABASE IF NOT EXISTS `theater_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `theater_db`;

-- 1. جدول بيانات الفعالية والمسرح
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL DEFAULT 'المسرح الرئيسي - حفل التكريم والافتتاح',
  `organizer` VARCHAR(255) NOT NULL DEFAULT 'إدارة المسرح والفعاليات',
  `event_date` VARCHAR(100) NOT NULL DEFAULT 'الجمعة، 25 أكتوبر 2026',
  `event_time` VARCHAR(100) NOT NULL DEFAULT '08:00 مساءً (تفتح الأبواب 07:00 مساءً)',
  `venue` VARCHAR(255) NOT NULL DEFAULT 'المسرح الرئيسي - القاعة الكبرى',
  `city` VARCHAR(100) NOT NULL DEFAULT 'الرياض، المملكة العربية السعودية',
  `logo_text` VARCHAR(100) DEFAULT 'المسرح الرئيسي',
  `logo_url` TEXT DEFAULT NULL,
  `theater_image_url` TEXT DEFAULT NULL,
  `note` TEXT DEFAULT 'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. جدول مقاعد المسرح
CREATE TABLE IF NOT EXISTS `seats` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,           -- مثال: G-A-01, B-A-04
  `level` VARCHAR(10) NOT NULL,                    -- G (أرضي) أو B (بلكونة)
  `level_name` VARCHAR(100) NOT NULL,              -- الدور الأرضي أو الدور الثاني - البلكونة
  `row_label` VARCHAR(10) NOT NULL,                -- A, B, C...
  `seat_number` VARCHAR(10) NOT NULL,              -- 01, 02...
  `raw_number` INT NOT NULL,                       -- 1, 2, 3...
  `sector` VARCHAR(50) NOT NULL,                   -- اليسار, الوسط, اليمين
  `sector_key` VARCHAR(20) NOT NULL,               -- left, center, right
  `status` ENUM('available', 'reserved', 'checked_in') NOT NULL DEFAULT 'available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_level_row` (`level`, `row_label`),
  INDEX `idx_status` (`status`),
  INDEX `idx_sector` (`sector_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. جدول الحجوزات والضيوف
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `seat_id` VARCHAR(50) NOT NULL UNIQUE,           -- مرتبط بمقعد واحد
  `guest_name` VARCHAR(255) NOT NULL,              -- اسم الضيف
  `guest_phone` VARCHAR(50) DEFAULT NULL,          -- رقم الجوال
  `category` VARCHAR(100) NOT NULL DEFAULT 'عام',  -- كبار الشخصيات VIP, ضيف شرف, عام
  `token` VARCHAR(100) NOT NULL UNIQUE,            -- رمز الدعوة الفريد: TK-XXXXXXXX
  `notes` TEXT DEFAULT NULL,
  `booked_at` DATETIME NOT NULL,
  `checked_in_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_booking_seat` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`) ON DELETE CASCADE,
  INDEX `idx_guest_name` (`guest_name`),
  INDEX `idx_guest_phone` (`guest_phone`),
  INDEX `idx_token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- إدخال بيانات الفعالية الافتراضية
INSERT INTO `events` (`id`, `title`, `organizer`, `event_date`, `event_time`, `venue`, `city`, `logo_text`, `note`)
VALUES (
  1, 
  'المسرح الرئيسي - حفل التكريم والافتتاح', 
  'إدارة المسرح والفعاليات', 
  'الجمعة، 25 أكتوبر 2026', 
  '08:00 مساءً (تفتح الأبواب 07:00 مساءً)', 
  'المسرح الرئيسي - القاعة الكبرى', 
  'الرياض، المملكة العربية السعودية', 
  'المسرح الرئيسي', 
  'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.'
)
ON DUPLICATE KEY UPDATE `id`=`id`;
