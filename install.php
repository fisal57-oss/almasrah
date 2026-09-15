<?php
/**
 * معالج التثبيت والتهيئة التلقائية لنظام حجز مقاعد المسرح (PHP / SQL)
 * One-Click Automated Database Installer & Setup
 */

require_once __DIR__ . '/config.php';

$messages = [];
$success = true;
$dbType = 'MySQL';

try {
    // محاولة الاتصال بـ MySQL وإنشاء قاعدة البيانات إذا لم تكن موجودة
    try {
        $rootPdo = new PDO("mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4", DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        $rootPdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
        $messages[] = "✅ تم التحقق من قاعدة بيانات MySQL (" . DB_NAME . ") بنجاح.";
        $db = getDb();
    } catch (Exception $mySqlErr) {
        // إذا فشل MySQL، نستخدم SQLite كقاعدة بيانات محلية فورية
        $messages[] = "⚠️ تنبيه MySQL: " . $mySqlErr->getMessage() . " -> جاري تفعيل قاعدة بيانات SQLite المحلية الاحتياطية...";
        $db = new PDO("sqlite:" . SQLITE_FALLBACK_FILE);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbType = 'SQLite (ملف محلي محمول)';
    }

    // إنشاء الجداول
    if ($dbType === 'MySQL') {
        $db->exec("
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
        ");

        $db->exec("
            CREATE TABLE IF NOT EXISTS `seats` (
              `id` VARCHAR(50) NOT NULL PRIMARY KEY,
              `level` VARCHAR(10) NOT NULL,
              `level_name` VARCHAR(100) NOT NULL,
              `row_label` VARCHAR(10) NOT NULL,
              `seat_number` VARCHAR(10) NOT NULL,
              `raw_number` INT NOT NULL,
              `sector` VARCHAR(50) NOT NULL,
              `sector_key` VARCHAR(20) NOT NULL,
              `status` ENUM('available', 'reserved', 'checked_in') NOT NULL DEFAULT 'available',
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              INDEX `idx_level_row` (`level`, `row_label`),
              INDEX `idx_status` (`status`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");

        $db->exec("
            CREATE TABLE IF NOT EXISTS `bookings` (
              `id` INT AUTO_INCREMENT PRIMARY KEY,
              `seat_id` VARCHAR(50) NOT NULL UNIQUE,
              `guest_name` VARCHAR(255) NOT NULL,
              `guest_phone` VARCHAR(50) DEFAULT NULL,
              `category` VARCHAR(100) NOT NULL DEFAULT 'عام',
              `token` VARCHAR(100) NOT NULL UNIQUE,
              `notes` TEXT DEFAULT NULL,
              `booked_at` DATETIME NOT NULL,
              `checked_in_at` DATETIME DEFAULT NULL,
              `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              CONSTRAINT `fk_b_seat` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    } else {
        // SQLite Tables
        $db->exec("
            CREATE TABLE IF NOT EXISTS `events` (
              `id` INTEGER PRIMARY KEY AUTOINCREMENT,
              `title` TEXT NOT NULL,
              `organizer` TEXT NOT NULL,
              `event_date` TEXT NOT NULL,
              `event_time` TEXT NOT NULL,
              `venue` TEXT NOT NULL,
              `city` TEXT NOT NULL,
              `logo_text` TEXT,
              `logo_url` TEXT,
              `theater_image_url` TEXT,
              `note` TEXT,
              `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ");

        $db->exec("
            CREATE TABLE IF NOT EXISTS `seats` (
              `id` TEXT PRIMARY KEY,
              `level` TEXT NOT NULL,
              `level_name` TEXT NOT NULL,
              `row_label` TEXT NOT NULL,
              `seat_number` TEXT NOT NULL,
              `raw_number` INTEGER NOT NULL,
              `sector` TEXT NOT NULL,
              `sector_key` TEXT NOT NULL,
              `status` TEXT NOT NULL DEFAULT 'available',
              `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
              `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ");

        $db->exec("
            CREATE TABLE IF NOT EXISTS `bookings` (
              `id` INTEGER PRIMARY KEY AUTOINCREMENT,
              `seat_id` TEXT UNIQUE NOT NULL,
              `guest_name` TEXT NOT NULL,
              `guest_phone` TEXT,
              `category` TEXT NOT NULL DEFAULT 'عام',
              `token` TEXT UNIQUE NOT NULL,
              `notes` TEXT,
              `booked_at` DATETIME NOT NULL,
              `checked_in_at` DATETIME,
              `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
              `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (`seat_id`) REFERENCES `seats`(`id`) ON DELETE CASCADE
            );
        ");
    }

    $messages[] = "✅ تم إنشاء وتأكيد هيكل الجداول بنجاح (events, seats, bookings).";

    // التحقق من بيانات الفعالية
    $eventStmt = $db->query("SELECT COUNT(*) FROM `events`");
    if ($eventStmt->fetchColumn() == 0) {
        $insEvent = $db->prepare("
            INSERT INTO `events` (`title`, `organizer`, `event_date`, `event_time`, `venue`, `city`, `logo_text`, `note`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $insEvent->execute([
            'المسرح الرئيسي - حفل التكريم والافتتاح',
            'إدارة المسرح والفعاليات',
            'الجمعة، 25 أكتوبر 2026',
            '08:00 مساءً (تفتح الأبواب 07:00 مساءً)',
            'المسرح الرئيسي - القاعة الكبرى',
            'الرياض، المملكة العربية السعودية',
            'المسرح الرئيسي',
            'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.'
        ]);
        $messages[] = "✅ تم إدراج تفاصيل الفعالية الافتراضية.";
    }

    // التحقق من المقاعد
    $seatsStmt = $db->query("SELECT COUNT(*) FROM `seats`");
    $seatsCount = $seatsStmt->fetchColumn();

    if ($seatsCount == 0) {
        $defaultSeats = generateDefaultSeatsArray();
        $db->beginTransaction();

        $seatInsert = $db->prepare("
            INSERT INTO `seats` (`id`, `level`, `level_name`, `row_label`, `seat_number`, `raw_number`, `sector`, `sector_key`, `status`)
            VALUES (:id, :level, :level_name, :row_label, :seat_number, :raw_number, :sector, :sector_key, :status)
        ");

        foreach ($defaultSeats as $seat) {
            $seatInsert->execute([
                ':id'          => $seat['id'],
                ':level'       => $seat['level'],
                ':level_name'  => $seat['level_name'],
                ':row_label'   => $seat['row_label'],
                ':seat_number' => $seat['seat_number'],
                ':raw_number'  => $seat['raw_number'],
                ':sector'      => $seat['sector'],
                ':sector_key'  => $seat['sector_key'],
                ':status'      => 'available'
            ]);
        }

        // إدراج بعض الحجوزات التجريبية
        $demoBookings = [
            ['seat_id' => 'G-A-05', 'name' => 'سعادة الدكتور عبد الرحمن الشمري', 'phone' => '0501112233', 'category' => 'كبار الشخصيات VIP'],
            ['seat_id' => 'G-A-06', 'name' => 'الأستاذة سارة بن عبد العزيز',      'phone' => '0504445566', 'category' => 'ضيف شرف'],
            ['seat_id' => 'G-B-08', 'name' => 'المهندس فهد العتيبي',             'phone' => '0557778899', 'category' => 'ضيوف مميزون'],
            ['seat_id' => 'B-A-04', 'name' => 'الأستاذ خالد السليمان',            'phone' => '0569990011', 'category' => 'عام']
        ];

        $bookStmt = $db->prepare("
            INSERT INTO `bookings` (`seat_id`, `guest_name`, `guest_phone`, `category`, `token`, `booked_at`)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $updateSeatStmt = $db->prepare("UPDATE `seats` SET `status` = 'reserved' WHERE `id` = ?");

        foreach ($demoBookings as $demo) {
            $token = generateToken();
            $bookStmt->execute([
                $demo['seat_id'],
                $demo['name'],
                $demo['phone'],
                $demo['category'],
                $token,
                date('Y-m-d H:i:s')
            ]);
            $updateSeatStmt->execute([$demo['seat_id']]);
        }

        $db->commit();
        $messages[] = "✅ تم بنجاح توليد وإدخال كامل مقاعد المسرح (746 مقعداً) مع 4 حجوزات تجريبية.";
    } else {
        $messages[] = "ℹ️ مقاعد المسرح موجودة مسبقاً في قاعدة البيانات ($seatsCount مقعد). لم يتم إجراء تعديل.";
    }

} catch (Exception $e) {
    $success = false;
    $messages[] = "❌ حدث خطأ أثناء التثبيت: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مثبّت نظام حجز مقاعد المسرح - PHP & SQL</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; }
  </style>
</head>
<body class="bg-[#080E1A] text-white min-h-screen flex items-center justify-center p-4">
  <div class="max-w-2xl w-full bg-[#0c162b] border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
    
    <div class="text-center space-y-2">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center mx-auto text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20">
        🏛️
      </div>
      <h1 class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
        معالج تهيئة قاعدة البيانات (PHP / SQL)
      </h1>
      <p class="text-xs text-slate-400">
        نوع المحرك الحالي: <strong class="text-cyan-300"><?= htmlspecialchars($dbType) ?></strong>
      </p>
    </div>

    <!-- Status Log Messages -->
    <div class="bg-slate-950/80 p-5 rounded-2xl border border-white/10 space-y-2.5 font-mono text-xs text-slate-300">
      <?php foreach ($messages as $msg): ?>
        <div class="flex items-start gap-2">
          <span><?= $msg ?></span>
        </div>
      <?php endforeach; ?>
    </div>

    <?php if ($success): ?>
      <div class="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-bold text-center">
        🎉 اكتملت عملية التثبيت والتهيئة بنجاح تام! النظام جاهز الآن للعمل.
      </div>

      <!-- Quick Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <a href="beneficiary.php" class="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg transition-all text-center">
          <span>🎟️ فتح صفحة المستفيد والضيوف</span>
        </a>

        <a href="index.php" class="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm border border-cyan-400/30 transition-all text-center">
          <span>🛠️ فتح لوحة التحكم الإدارية</span>
        </a>
      </div>
    <?php else: ?>
      <div class="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs sm:text-sm font-bold text-center">
        يرجى التأكد من تشغيل خادم MySQL وصحة بيانات الاتصال في ملف config.php ثم إعادة المحاولة.
      </div>
    <?php endif; ?>

  </div>
</body>
</html>
