<?php
/**
 * API إعادة ضبط المقاعد للمصنع (PHP / SQL)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$db = getDb();

try {
    $db->beginTransaction();

    // حذف كافة الحجوزات
    $db->exec("DELETE FROM `bookings`");

    // حذف المقاعد الحالية
    $db->exec("DELETE FROM `seats`");

    // إعادة توليد المقاعد الـ 746
    $defaultSeats = generateDefaultSeatsArray();
    $insert = $db->prepare("
        INSERT INTO `seats` (`id`, `level`, `level_name`, `row_label`, `seat_number`, `raw_number`, `sector`, `sector_key`, `status`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available')
    ");

    foreach ($defaultSeats as $s) {
        $insert->execute([
            $s['id'], $s['level'], $s['level_name'], $s['row_label'], $s['seat_number'],
            $s['raw_number'], $s['sector'], $s['sector_key']
        ]);
    }

    $db->commit();

    jsonResponse(['success' => true, 'message' => 'تمت إعادة ضبط جميع مقاعد المسرح لحالة المصنع بنجاح']);
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
