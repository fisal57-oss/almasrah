<?php
/**
 * API بيانات الفعالية والمسرح (PHP / SQL)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$db = getDb();
$method = $_SERVER['REQUEST_METHOD'];

// 1. استعلام بيانات الفعالية (GET)
if ($method === 'GET') {
    try {
        $stmt = $db->query("SELECT * FROM `events` ORDER BY id ASC LIMIT 1");
        $event = $stmt->fetch();

        if (!$event) {
            $event = [
                'title'            => 'المسرح الرئيسي - حفل التكريم والافتتاح',
                'organizer'        => 'إدارة المسرح والفعاليات',
                'event_date'       => 'الجمعة، 25 أكتوبر 2026',
                'event_time'       => '08:00 مساءً (تفتح الأبواب 07:00 مساءً)',
                'venue'            => 'المسرح الرئيسي - القاعة الكبرى',
                'city'             => 'الرياض، المملكة العربية السعودية',
                'logo_text'        => 'المسرح الرئيسي',
                'logo_url'         => '',
                'theater_image_url'=> '',
                'note'             => 'يرجى إبراز بطاقة الحضور عند مدخل المسرح للتحقق عبر الـ QR Code.'
            ];
        }

        // تنسيق الأسماء لتطابق الواجهات
        jsonResponse([
            'id'              => $event['id'] ?? 1,
            'title'           => $event['title'],
            'organizer'       => $event['organizer'],
            'date'            => $event['event_date'],
            'time'            => $event['event_time'],
            'venue'           => $event['venue'],
            'city'            => $event['city'],
            'logoText'        => $event['logo_text'],
            'logoUrl'         => $event['logo_url'] ?? '',
            'theaterImageUrl' => $event['theater_image_url'] ?? '',
            'note'            => $event['note'] ?? ''
        ]);
    } catch (Exception $e) {
        jsonResponse(['error' => $e->getMessage()], 500);
    }
}

// 2. تحديث بيانات الفعالية (POST)
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

    try {
        $title     = $input['title'] ?? 'المسرح الرئيسي';
        $organizer = $input['organizer'] ?? 'إدارة المسرح والفعاليات';
        $date      = $input['date'] ?? '';
        $time      = $input['time'] ?? '';
        $venue     = $input['venue'] ?? '';
        $city      = $input['city'] ?? '';
        $logoText  = $input['logoText'] ?? '';
        $note      = $input['note'] ?? '';

        $stmt = $db->prepare("
            UPDATE `events` SET 
                `title` = ?, `organizer` = ?, `event_date` = ?, `event_time` = ?,
                `venue` = ?, `city` = ?, `logo_text` = ?, `note` = ?
            WHERE `id` = 1
        ");
        $stmt->execute([$title, $organizer, $date, $time, $venue, $city, $logoText, $note]);

        jsonResponse(['success' => true, 'message' => 'تم حفظ بيانات الفعالية بنجاح']);
    } catch (Exception $e) {
        jsonResponse(['error' => $e->getMessage()], 500);
    }
}

jsonResponse(['error' => 'طلب غير صالح'], 400);
