<?php
require_once __DIR__ . '/../config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$pdo = getDb();

function integrationEventId() {
    return 'EVT-' . date('Y') . '-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 7));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $requestId = trim($_GET['requestId'] ?? '');
    if ($requestId !== '') {
        $stmt = $pdo->prepare('SELECT * FROM integration_requests WHERE request_id = ? LIMIT 1');
        $stmt->execute([$requestId]);
        $row = $stmt->fetch();
        if (!$row) jsonResponse(['success' => false, 'error' => 'request_not_found'], 404);
        jsonResponse(['success' => true, 'request' => $row]);
    }
    $rows = $pdo->query('SELECT * FROM integration_requests ORDER BY created_at DESC')->fetchAll();
    jsonResponse(['success' => true, 'requests' => $rows]);
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$requestId = trim($body['requestId'] ?? '');
if ($requestId === '') jsonResponse(['success' => false, 'error' => 'requestId_required'], 422);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sql = 'INSERT INTO integration_requests (request_id,event_id,source,status,org_name,contact_name,phone,event_title,booking_date,time_slot,venue_id,venue_name,venue_location,expected_attendees,equipments_json,notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE org_name=VALUES(org_name),contact_name=VALUES(contact_name),phone=VALUES(phone),event_title=VALUES(event_title),booking_date=VALUES(booking_date),time_slot=VALUES(time_slot),venue_id=VALUES(venue_id),venue_name=VALUES(venue_name),venue_location=VALUES(venue_location),expected_attendees=VALUES(expected_attendees),equipments_json=VALUES(equipments_json),notes=VALUES(notes),updated_at=CURRENT_TIMESTAMP';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $requestId, $body['eventId'] ?? null, $body['source'] ?? 'almasrah-beneficiary', $body['status'] ?? 'pending',
        $body['orgName'] ?? null, $body['contactName'] ?? null, $body['phone'] ?? null, $body['eventTitle'] ?? null,
        $body['bookingDate'] ?: null, $body['timeSlot'] ?? null, $body['venueId'] ?? null, $body['venueName'] ?? null,
        $body['venueLocation'] ?? null, $body['expectedAttendees'] ?? null,
        json_encode($body['equipments'] ?? [], JSON_UNESCAPED_UNICODE), $body['notes'] ?? null
    ]);
    jsonResponse(['success' => true, 'requestId' => $requestId, 'status' => $body['status'] ?? 'pending'], 201);
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $allowed = ['pending','approved','rejected','needs_info','cancelled'];
    $status = $body['status'] ?? '';
    if (!in_array($status, $allowed, true)) jsonResponse(['success' => false, 'error' => 'invalid_status'], 422);
    $eventId = $body['eventId'] ?? null;
    if ($status === 'approved' && !$eventId) $eventId = integrationEventId();
    $stmt = $pdo->prepare('UPDATE integration_requests SET status=?, event_id=COALESCE(?,event_id), updated_at=CURRENT_TIMESTAMP WHERE request_id=?');
    $stmt->execute([$status, $eventId, $requestId]);
    if ($stmt->rowCount() === 0) jsonResponse(['success' => false, 'error' => 'request_not_found'], 404);
    jsonResponse(['success' => true, 'requestId' => $requestId, 'status' => $status, 'eventId' => $eventId]);
}

jsonResponse(['success' => false, 'error' => 'method_not_allowed'], 405);
