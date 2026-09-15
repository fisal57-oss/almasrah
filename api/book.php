<?php
/**
 * API تأكيد حجز مقعد (PHP / SQL)
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
$guest  = $input['guest'] ?? [];

if (!$seatId) {
    jsonResponse(['success' => false, 'message' => 'لم يتم تحديد رقم المقعد'], 400);
}

$name     = trim($guest['name'] ?? 'ضيف مكرّم');
$phone    = trim($guest['phone'] ?? '');
$category = trim($guest['category'] ?? 'عام');
$notes    = trim($guest['notes'] ?? '');

try {
    // التحقق من حالة المقعد
    $checkStmt = $db->prepare("SELECT * FROM `seats` WHERE `id` = ?");
    $checkStmt->execute([$seatId]);
    $seat = $checkStmt->fetch();

    if (!$seat) {
        jsonResponse(['success' => false, 'message' => 'المقعد غير موجود بالنظام'], 404);
    }

    if ($seat['status'] !== 'available') {
        jsonResponse(['success' => false, 'message' => 'عذراً! هذا المقعد محجوز مسبقاً.'], 409);
    }

    $token = generateToken();
    $now = date('Y-m-d H:i:s');

    $db->beginTransaction();

    // إدراج الحجز
    $bookStmt = $db->prepare("
        INSERT INTO `bookings` (`seat_id`, `guest_name`, `guest_phone`, `category`, `token`, `notes`, `booked_at`)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $bookStmt->execute([$seatId, $name, $phone, $category, $token, $notes, $now]);

    // تحديث حالة المقعد
    $upSeat = $db->prepare("UPDATE `seats` SET `status` = 'reserved' WHERE `id` = ?");
    $upSeat->execute([$seatId]);

    $db->commit();

    jsonResponse([
        'success' => true,
        'message' => 'تم الحجز بنجاح!',
        'token'   => $token,
        'seat'    => [
            'id'        => $seat['id'],
            'level'     => $seat['level'],
            'levelName' => $seat['level_name'],
            'row'       => $seat['row_label'],
            'number'    => $seat['seat_number'],
            'sector'    => $seat['sector'],
            'status'    => 'reserved',
            'guest'     => [
                'name'     => $name,
                'phone'    => $phone,
                'category' => $category,
                'token'    => $token,
                'bookedAt' => $now
            ]
        ]
    ]);

} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    jsonResponse(['success' => false, 'message' => 'خطأ أثناء الحجز: ' . $e->getMessage()], 500);
}
