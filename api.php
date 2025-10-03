<?php
// api.php
header("Content-Type: application/json; charset=UTF-8");
require_once 'db.php';

try {
    $pdo = connect_db();
    
    // URLパラメータで'surah'が指定されているかチェック
    if (isset($_GET['surah']) && !empty($_GET['surah'])) {
        // --- 特定のスーラのアーヤを返す ---
        $surah_id = (int)$_GET['surah'];
        $stmt = $pdo->prepare(
            // surahsテーブルをJOINして、surah_name_japaneseも一緒に取得する
            "SELECT a.id, a.surah_id, a.ayah_number, a.text_arabic, a.text_japanese, s.name_japanese AS surah_name_japanese 
             FROM ayahs a
             JOIN surahs s ON a.surah_id = s.id
             WHERE a.surah_id = ? 
             ORDER BY a.ayah_number ASC"
        );
        $stmt->execute([$surah_id]);
        $results = $stmt->fetchAll();
    } else {
        // --- 全てのスーラ一覧を返す ---
        $stmt = $pdo->query("SELECT id, name_arabic, name_japanese, total_ayahs FROM surahs ORDER BY id ASC");
        $results = $stmt->fetchAll();
    }

    echo json_encode($results);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
