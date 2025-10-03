<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quraan.jp</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <div class="navigation">
            <a href="/" class="back-button">← スーラ一覧</a>
            <h1 id="view-title">読み込み中...</h1>
        </div>
    </header>

    <div class="container">
        <main id="main-content">
            <div id="ayah-view">
                </div>
        </main>
        
        <aside id="sidebar">
            <button id="close-sidebar">×</button>
            <div id="sidebar-content">
                <p>アーヤをクリックすると、ここに注釈などが表示されます。</p>
            </div>
        </aside>
    </div>

    <script src="surah.js"></script>
</body>
</html>
