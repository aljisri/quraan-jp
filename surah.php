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
        <div class="site-header">
            <h1><a href="/">Quraan.jp</a></h1>
        </div>
        <div class="content-header">
            <a href="/" class="close-button">×</a>
            <h2 id="view-title">読み込み中...</h2>
        </div>
    </header>

    <div class="container">
        <main id="main-content">
            <div id="ayah-view" class="view-container">
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
