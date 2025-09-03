<?php
// api.php

// どのファイルからでも呼び出せるようにCORSヘッダーを設定
header("Access-Control-Allow-Origin: *");
// 出力がJSON形式であることをブラウザに伝える
header("Content-Type: application/json; charset=UTF-8");

require_once 'db.php';

// URLのパラメータからスーラ番号を取得 (例: /api.php?surah=1)
// 指定がない場合は1をデフォルトとする
$surah_id = isset($_GET['surah']) ? (int)$_GET['surah'] : 1;

try {
    $pdo = connect_db();
    if (!$pdo) {
        throw new Exception("データベース接続に失敗しました。");
    }

    // データベースから指定されたスーラのアーヤを取得
    // ayahsテーブルとsurahsテーブルを想定
    $stmt = $pdo->prepare("SELECT * FROM ayahs WHERE surah_id = ? ORDER BY ayah_number ASC");
    $stmt->execute([$surah_id]);
    $ayahs = $stmt->fetchAll();

    // 取得したデータをJSON形式で出力
    echo json_encode($ayahs);

} catch (Exception $e) {
    // エラーハンドリング
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => $e->getMessage()]);
}
?>
