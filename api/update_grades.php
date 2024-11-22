<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['studentId']) || !isset($data['grades'])) {
            throw new Exception('Missing required data');
        }

        $updates = [];
        $params = ['id' => $data['studentId']];
        
        if (isset($data['grades']['ca1'])) {
            $updates[] = "ca1 = :ca1";
            $params['ca1'] = $data['grades']['ca1'];
        }
        if (isset($data['grades']['ca2'])) {
            $updates[] = "ca2 = :ca2";
            $params['ca2'] = $data['grades']['ca2'];
        }
        if (isset($data['grades']['exam'])) {
            $updates[] = "exam = :exam";
            $params['exam'] = $data['grades']['exam'];
        }

        if (empty($updates)) {
            throw new Exception('No grades to update');
        }

        // Calculate total
        $updates[] = "total = IFNULL(ca1, 0) + IFNULL(ca2, 0) + IFNULL(exam, 0)";

        $sql = "UPDATE students SET " . implode(", ", $updates) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Grades updated successfully'
            ]);
        } else {
            throw new Exception('No student found with ID ' . $data['studentId']);
        }

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}