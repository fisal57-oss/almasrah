<?php
/**
 * API المقاعد - استعلام، إضافة، حذف، وإعادة ترقيم (PHP / SQL)
 */

require_once __DIR__ . '/../config.php';

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$db = getDb();
$method = $_SERVER['REQUEST_METHOD'];

// 1. استعلام كافة المقاعد (GET)
if ($method === 'GET') {
    try {
        $sql = "
            SELECT 
                s.id, s.level, s.level_name, s.row_label, s.seat_number, s.raw_number, s.sector, s.sector_key, s.status,
                b.guest_name, b.guest_phone, b.category, b.token, b.notes, b.booked_at, b.checked_in_at
            FROM `seats` s
            LEFT JOIN `bookings` b ON s.id = b.seat_id
            ORDER BY s.level ASC, s.row_label ASC, s.raw_number ASC
        ";
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll();

        $seats = [];
        foreach ($rows as $r) {
            $guest = null;
            if (!empty($r['guest_name'])) {
                $guest = [
                    'name'        => $r['guest_name'],
                    'phone'       => $r['guest_phone'] ?? '',
                    'category'    => $r['category'] ?? 'عام',
                    'token'       => $r['token'] ?? '',
                    'notes'       => $r['notes'] ?? '',
                    'bookedAt'    => $r['booked_at'] ?? null,
                    'checkedInAt' => $r['checked_in_at'] ?? null
                ];
            }

            $seats[] = [
                'id'        => $r['id'],
                'level'     => $r['level'],
                'levelName' => $r['level_name'],
                'row'       => $r['row_label'],
                'number'    => $r['seat_number'],
                'rawNumber' => (int)$r['raw_number'],
                'sector'    => $r['sector'],
                'sectorKey' => $r['sector_key'],
                'status'    => $r['status'],
                'guest'     => $guest
            ];
        }

        jsonResponse($seats);
    } catch (Exception $e) {
        jsonResponse(['error' => $e->getMessage()], 500);
    }
}

// قراءة بيانات المدخلات للعمليات الأخرى
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$action = $input['action'] ?? ($method === 'DELETE' ? 'delete' : 'get');

// 2. حذف مقعد (DELETE / action=delete)
if ($action === 'delete') {
    $seatId = $input['seatId'] ?? $_GET['seatId'] ?? null;
    if (!$seatId) {
        jsonResponse(['success' => false, 'message' => 'لم يتم تحديد المقعد المراد حذفه'], 400);
    }

    $chk = $db->prepare("SELECT status FROM `seats` WHERE id = ?");
    $chk->execute([$seatId]);
    $seat = $chk->fetch();

    if (!$seat) {
        jsonResponse(['success' => false, 'message' => 'المقعد غير موجود'], 404);
    }
    if ($seat['status'] !== 'available') {
        jsonResponse(['success' => false, 'message' => 'لا يمكن حذف مقعد محجوز مسبقاً!'], 400);
    }

    $del = $db->prepare("DELETE FROM `seats` WHERE id = ?");
    $del->execute([$seatId]);

    jsonResponse(['success' => true, 'message' => 'تم حذف المقعد بنجاح']);
}

// 3. إضافة مقاعد للصف (POST action=add)
if ($action === 'add') {
    $level = $input['level'] ?? 'G';
    $row = strtoupper(trim($input['row'] ?? 'A'));
    $sectorKey = $input['sectorKey'] ?? 'center';
    $count = (int)($input['count'] ?? 1);

    $sectorNames = ['left' => 'اليسار', 'center' => 'الوسط', 'right' => 'اليمين'];
    $sectorName = $sectorNames[$sectorKey] ?? 'الوسط';
    $levelName = ($level === 'G') ? 'الدور الأرضي' : 'الدور الثاني - البلكونة';

    // إيجاد أقصى رقم مقعد في الصف والقطاع
    $maxStmt = $db->prepare("SELECT MAX(raw_number) FROM `seats` WHERE level = ? AND row_label = ?");
    $maxStmt->execute([$level, $row]);
    $maxNum = (int)$maxStmt->fetchColumn();

    $insert = $db->prepare("
        INSERT INTO `seats` (`id`, `level`, `level_name`, `row_label`, `seat_number`, `raw_number`, `sector`, `sector_key`, `status`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'available')
    ");

    $db->beginTransaction();
    for ($i = 0; $i < $count; $i++) {
        $raw = $maxNum + 1 + $i;
        $numStr = str_pad($raw, 2, '0', STR_PAD_LEFT);
        $tempId = "{$level}-{$row}-{$numStr}";
        
        // التحقق من عدم التكرار
        $dupCheck = $db->prepare("SELECT id FROM `seats` WHERE id = ?");
        $dupCheck->execute([$tempId]);
        if ($dupCheck->fetch()) {
            $tempId = "{$level}-{$row}-" . substr(uniqid(), -4);
        }

        $insert->execute([$tempId, $level, $levelName, $row, $numStr, $raw, $sectorName, $sectorKey]);
    }
    $db->commit();

    jsonResponse(['success' => true, 'addedCount' => $count]);
}

jsonResponse(['error' => 'طلب غير صالح'], 400);
