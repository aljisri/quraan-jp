<?php
// db.php

/**
 * PDOを使ってデータベースに接続する
 * @return PDO|null 接続オブジェクトまたはnull
 */
function connect_db() {
    // .envファイルから環境変数を読み込む
    // この方法はシンプルですが、本番環境ではより堅牢なライブラリを使うこともあります
    $env = parse_ini_file('.env');

    $host = $env['DB_HOST'];
    $db   = $env['DB_NAME'];
    $user = $env['DB_USER'];
    $pass = $env['DB_PASSWORD'];
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        // エラーが発生した場合は、エラーメッセージをログに残すなどして処理
        // ここでは単純にnullを返します
        error_log($e->getMessage());
        return null;
    }
}
?>
