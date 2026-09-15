<?php
/**
 * إعدادات الاتصال بقاعدة البيانات والدوال المساعدة للنظام
 * Theater Seat Reservations & Beneficiary Portal - Database Config
 */

// منع عرض أخطاء التحذيرات في بيئة الإنتاج مع تسجيلها
ini_set('display_errors', 0);
error_reporting(E_ALL);

// ضبط المنطقة الزمنية والترميز
date_default_timezone_set('Asia/Riyadh');
header('Content-Type: text/html; charset=UTF-8');

// ==========================================
// 1. إعدادات قاعدة البيانات (MySQL / MariaDB)
// ==========================================
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: 'theater_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_PORT', getenv('DB_PORT') ?: 3306);

// ملف SQLite اختياري كاحتياط تلقائي في حال عدم توفر خادم MySQL
define('SQLITE_FALLBACK_FILE', __DIR__ . '/theater_fallback.sqlite');

/**
 * دالة الاتصال بقاعدة البيانات عبر PDO
 * @return PDO
 */
function getDb() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // إذا لم تكن قاعدة بيانات MySQL موجودة أو فشل الاتصال، نحاول استخدام SQLite كحل احتياطي متنقل
        try {
            $sqliteDsn = "sqlite:" . SQLITE_FALLBACK_FILE;
            $pdo = new PDO($sqliteDsn);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (Exception $sqle) {
            die("خطأ في الاتصال بقاعدة البيانات: " . htmlspecialchars($e->getMessage()));
        }
    }
}

/**
 * إرسال استجابة JSON موحدة
 */
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

/**
 * تنسيق كود المقعد بالعربية
 */
function formatArabicSeatCode($seat) {
    if (!$seat) return '';
    $floor = ($seat['level'] === 'G') ? 'الدور الأرضي' : 'الدور الثاني';
    $row = $seat['row_label'] ?? $seat['row'] ?? '';
    $num = $seat['seat_number'] ?? $seat['number'] ?? '';
    return "{$floor} – {$row}-{$num}";
}

/**
 * توليد كود دعوة عشوائي فريد
 */
function generateToken() {
    return 'TK-' . strtoupper(substr(bin2hex(random_bytes(5)), 0, 8));
}

/**
 * توليد هيكل المقاعد الافتراضي (746 مقعداً) وفق مواصفات المسرح المعتمدة
 */
function generateDefaultSeatsArray() {
    $seats = [];
    $alphabet = range('A', 'Z');

    // 1. الدور الأرضي (G) - 21 صفاً (A إلى U)
    $gRows = array_slice($alphabet, 0, 21);
    foreach ($gRows as $idx => $row) {
        $groups = ($idx === 0) ? [6, 10, 6] : [7, 12, 7];
        $seatNo = 1;

        foreach ($groups as $groupIdx => $count) {
            $sectorName = 'اليسار';
            $sectorKey  = 'left';
            if ($groupIdx === 1) {
                $sectorName = 'الوسط';
                $sectorKey  = 'center';
            } elseif ($groupIdx === 2) {
                $sectorName = 'اليمين';
                $sectorKey  = 'right';
            }

            for ($i = 0; $i < $count; $i++) {
                $nStr = str_pad($seatNo, 2, '0', STR_PAD_LEFT);
                $id = "G-{$row}-{$nStr}";
                $seats[] = [
                    'id'          => $id,
                    'level'       => 'G',
                    'level_name'  => 'الدور الأرضي',
                    'row_label'   => $row,
                    'seat_number' => $nStr,
                    'raw_number'  => $seatNo,
                    'sector'      => $sectorName,
                    'sector_key'  => $sectorKey,
                    'status'      => 'available'
                ];
                $seatNo++;
            }
        }
    }

    // 2. الدور الثاني - البلكونة (B) - 8 صفوف (A إلى H)
    $bRows = array_slice($alphabet, 0, 8);
    foreach ($bRows as $idx => $row) {
        $groups = ($idx === 0) ? [6, 10, 6] : [7, 12, 7];
        $seatNo = 1;

        foreach ($groups as $groupIdx => $count) {
            $sectorName = 'اليسار';
            $sectorKey  = 'left';
            if ($groupIdx === 1) {
                $sectorName = 'الوسط';
                $sectorKey  = 'center';
            } elseif ($groupIdx === 2) {
                $sectorName = 'اليمين';
                $sectorKey  = 'right';
            }

            for ($i = 0; $i < $count; $i++) {
                $nStr = str_pad($seatNo, 2, '0', STR_PAD_LEFT);
                $id = "B-{$row}-{$nStr}";
                $seats[] = [
                    'id'          => $id,
                    'level'       => 'B',
                    'level_name'  => 'الدور الثاني - البلكونة',
                    'row_label'   => $row,
                    'seat_number' => $nStr,
                    'raw_number'  => $seatNo,
                    'sector'      => $sectorName,
                    'sector_key'  => $sectorKey,
                    'status'      => 'available'
                ];
                $seatNo++;
            }
        }
    }

    return $seats;
}
