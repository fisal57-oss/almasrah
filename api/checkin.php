<?php
/**
 * API التحقق ومسح تذاكر الدخول بالبوابة (QR Code Scanner)
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
$code = strtoupper(trim($input['token'] ?? $input['code'] ?? ''));

if (!$code) {
    jsonResponse(['success' => false, 'message' => 'يرجى إدخال كود التذكرة أو مسح الـ QR Code'], 400);
}

try {
    // البحث عن التذكرة عبر الرمز أو رقم المقعد
    $stmt = $db->prepare("
        SELECT 
            b.*, s.level, s.level_name, s.row_label, s.seat_number, s.sector, s.status as seat_status
        FROM `bookings` b
        JOIN `seats` s ON b.seat_id = s.id
        WHERE UPPER(b.token) = ? OR UPPER(b.seat_id) = ? OR UPPER(b.token) LIKE ?
    ");
    $stmt->execute([$code, $code, "%$code"]);
    $booking = $stmt->fetch();

    if (!$booking) {
        jsonResponse([
            'success' => false,
            'code'    => 'NOT_FOUND',
            'message' => 'عذراً! لم يتم العثور على أي حجز مطابق لهذا الرمز.'
        ], 404);
    }

    // التحقق إذا كانت التذكرة مستخدمة مسبقاً
    if ($booking['checked_in_at'] !== null || $booking['seat_status'] === 'checked_in') {
        $checkInTime = date('h:i A', strtotime($booking['checked_in_at']));
        jsonResponse([
            'success' => false,
            'code'    => 'ALREADY_USED',
            'message' => "تنبيه: هذه التذكرة مستخدمة مسبقاً! تم تسجيل دخول ({$booking['guest_name']}) الساعة {$checkInTime}.",
            'seat'    => [
                'id'        => $booking['seat_id'],
                'guestName' => $booking['guest_name'],
                'seatCode'  => formatArabicSeatCode($booking)
            ]
        ], 409);
    }

    // تسجيل الدخول الآن
    $now = date('Y-m-d H:i:s');
    $db->beginTransaction();

    $upBooking = $db->prepare("UPDATE `bookings` SET `checked_in_at` = ? WHERE `id` = ?");
    $upBooking->execute([$now, $booking['id']]);

    $upSeat = $db->prepare("UPDATE `seats` SET `status` = 'checked_in' WHERE `id` = ?");
    $upSeat->execute([$booking['seat_id']]);

    $db->commit();

    jsonResponse([
        'success' => true,
        'code'    => 'SUCCESS',
        'message' => "تم تسجيل الدخول بنجاح! أهلاً وسهلاً بك ({$booking['guest_name']}).",
        'seat'    => [
            'id'        => $booking['seat_id'],
            'levelName' => $booking['level_name'],
            'sector'    => $booking['sector'],
            'row'       => $booking['row_label'],
            'number'    => $booking['seat_number'],
            'guestName' => $booking['guest_name'],
            'category'  => $booking['category'],
            'token'     => $booking['token'],
            'checkedIn' => $now
        ]
    ]);

} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    jsonResponse(['success' => false, 'message' => 'خطأ بالنظام: ' . $e->getMessage()], 500);
}
