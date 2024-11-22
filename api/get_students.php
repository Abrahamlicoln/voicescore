<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("
        SELECT id, full_name, matric_number, ca1, ca2, exam, total 
        FROM students 
        ORDER BY matric_number
    ");
    
    $students = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'data' => $students
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}