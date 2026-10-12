<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput ?: '', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$name = trim((string)($payload['name'] ?? ''));
$email = trim((string)($payload['email'] ?? ''));
$message = trim((string)($payload['message'] ?? ''));
$model = trim((string)($payload['model'] ?? ''));

if ($name === '' || mb_strlen($name) < 2 || mb_strlen($name) > 80) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid name']);
    exit;
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email']);
    exit;
}

if ($message === '' || mb_strlen($message) > 400) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid message']);
    exit;
}

if (mb_strlen($model) > 160 || preg_match('/[\r\n]/', $model)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid model']);
    exit;
}

$recipient = getenv('CONTACT_EMAIL') ?: 'info@raystream.hk';
$subject = 'Raystream enquiry' . ($model !== '' ? ': ' . $model : '');
$safeName = str_replace(["\r", "\n"], '', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$from = getenv('CONTACT_FROM') ?: 'Raystream <no-reply@raystream.hk>';

$bodyLines = [
    'New contact form request:',
    '',
    'Name: ' . $safeName,
    'Email: ' . $safeEmail,
    'Selected equipment: ' . ($model !== '' ? $model : 'General enquiry'),
    '',
    'Message:',
    $message,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $from,
    'Reply-To: ' . $safeEmail,
];

$sent = mail(
    $recipient,
    $subject,
    implode(PHP_EOL, $bodyLines),
    implode(PHP_EOL, $headers)
);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email']);
    exit;
}

echo json_encode(['ok' => true]);
