-- Shared booking requests between Almasrah beneficiary portal and Itgan
-- Apply this on the same MySQL server used by the PHP deployment.

CREATE TABLE IF NOT EXISTS `integration_requests` (
  `request_id` VARCHAR(80) NOT NULL PRIMARY KEY,
  `event_id` VARCHAR(80) DEFAULT NULL,
  `source` VARCHAR(80) NOT NULL DEFAULT 'almasrah-beneficiary',
  `status` ENUM('pending','approved','rejected','needs_info','cancelled') NOT NULL DEFAULT 'pending',
  `org_name` VARCHAR(255) DEFAULT NULL,
  `contact_name` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `event_title` VARCHAR(255) DEFAULT NULL,
  `booking_date` DATE DEFAULT NULL,
  `time_slot` VARCHAR(100) DEFAULT NULL,
  `venue_id` VARCHAR(100) DEFAULT NULL,
  `venue_name` VARCHAR(255) DEFAULT NULL,
  `venue_location` VARCHAR(255) DEFAULT NULL,
  `expected_attendees` INT DEFAULT NULL,
  `equipments_json` JSON DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_integration_status` (`status`),
  INDEX `idx_integration_event_id` (`event_id`),
  INDEX `idx_integration_booking_date` (`booking_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
