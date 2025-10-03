<?php
// api_surahs.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'db.php';

try {
    $pdo = connect_db();

    // surahsテーブルから全てのデータを取得
    $stmt = $pdo->query("SELECT id, name_arabic, name_japanese, total_ayahs FROM surahs ORDER BY id ASC");
    $surahs = $stmt->fetchAll();

    echo json_encode($surahs);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
