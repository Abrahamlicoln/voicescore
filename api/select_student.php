<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['lastFourDigits'])) {
            throw new Exception('Last four digits not provided');
        }

        $stmt = $pdo->prepare("
            SELECT id, full_name, matric_number, ca1, ca2, exam, total 
            FROM students 
            WHERE matric_number LIKE :pattern
            LIMIT 1
        ");
        
        $pattern = '%' . $data['lastFourDigits'];
        $stmt->execute(['pattern' => $pattern]);
        
        $student = $stmt->fetch();
        
        if ($student) {
            echo json_encode([
                'success' => true,
                'data' => $student
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No student found'
            ]);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}