<?php
/**
 * API إلغاء حجز مقعد (PHP / SQL)
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
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$seatId = trim($input['seatId'] ?? '');

if (!$seatId) {
    jsonResponse(['success' => false, 'message' => 'لم يتم تحديد رقم المقعد'], 400);
}

try {
    $db->beginTransaction();

    $delBooking = $db->prepare("DELETE FROM `bookings` WHERE `seat_id` = ?");
    $delBooking->execute([$seatId]);

    $upSeat = $db->prepare("UPDATE `seats` SET `status` = 'available' WHERE `id` = ?");
    $upSeat->execute([$seatId]);

    $db->commit();

    jsonResponse(['success' => true, 'message' => 'تم إلغاء الحجز وإعادة المقعد متاحاً بنجاح']);
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    jsonResponse(['success' => false, 'message' => $e->getMessage()], 500);
}
