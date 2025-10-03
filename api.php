<?php
// api.php
header("Content-Type: application/json; charset=UTF-8");

// --- キャッシュ設定 ---
$cache_file = 'cache/surahs.json';
$cache_lifetime = 3600; // 1時間 (秒単位)

// --- スーラ一覧の処理 ---
if (!isset($_GET['surah'])) {
    // キャッシュファイルが存在し、かつ有効期限内かチェック
    if (file_exists($cache_file) && (time() - filemtime($cache_file)) < $cache_lifetime) {
        // キャッシュから読み込んで出力
        readfile($cache_file);
        exit;
    }
}

// --- データベース接続 ---
require_once 'db.php';
try {
    $pdo = connect_db();
    
    if (isset($_GET['surah']) && !empty($_GET['surah'])) {
        // --- 特定のスーラのアーヤを返す ---
        $surah_id = (int)$_GET['surah'];
        $stmt = $pdo->prepare(
            "SELECT a.id, a.surah_id, a.ayah_number, a.text_arabic, a.text_japanese, s.name_japanese AS surah_name_japanese 
             FROM ayahs a
             JOIN surahs s ON a.surah_id = s.id
             WHERE a.surah_id = ? 
             ORDER BY a.ayah_number ASC"
        );
        $stmt->execute([$surah_id]);
        $results = $stmt->fetchAll();
    } else {
        // --- 全てのスーラ一覧を返す (キャッシュがない場合) ---
        $stmt = $pdo->query("SELECT id, name_arabic, name_japanese, total_ayahs FROM surahs ORDER BY id ASC");
        $results = $stmt->fetchAll();
        
        // 結果をキャッシュファイルに保存
        if (!is_dir('cache')) {
            mkdir('cache', 0755, true);
        }
        file_put_contents($cache_file, json_encode($results));
    }

    echo json_encode($results);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
