// surah.js

document.addEventListener('DOMContentLoaded', () => {
    // （以前のコードとほぼ同じですが、URLの読み取り方を少し変更しています）
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    // ...（他の要素取得コードは省略）...
    const viewTitle = document.getElementById('view-title');
    const ayahView = document.getElementById('ayah-view');
    const closeSidebarButton = document.getElementById('close-sidebar');

    let currentSelectedAyah = null;

    // URLパスからスーラIDを取得する関数 (例: quraan.jp/2 -> 2を取得)
    function getSurahIdFromURL() {
        // パスの最初の'/'を取り除き、数字部分を取得
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        // 数字でなければデフォルトで1を返す
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    // ... (loadSurah, openSidebar, closeSidebar, イベントリスナーなどの関数は変更なし) ...
    // （前回の回答からそのままコピーしてください）
    async function loadSurah(surahId) {
        try {
            const response = await fetch(`api.php?surah=${surahId}`);
            const ayahs = await response.json();

            if (ayahs.length > 0) {
                viewTitle.textContent = `第${ayahs[0].surah_id}章 ${ayahs[0].surah_name_japanese}`;
                document.title = `Quraan.jp - ${ayahs[0].surah_name_japanese}`;
            }

            ayahView.innerHTML = '';
            ayahs.forEach(ayah => {
                const ayahBox = document.createElement('div');
                ayahBox.className = 'ayah-box';
                ayahBox.dataset.ayahId = ayah.id;
                ayahBox.innerHTML = `
                    <p class="ayah-number">${ayah.surah_id}:${ayah.ayah_number}</p>
                    <p class="arabic-text">${ayah.text_arabic}</p>
                    <p class="japanese-text">${ayah.text_japanese || ''}</p>
                `;
                ayahView.appendChild(ayahBox);
            });
        } catch (error) {
            ayahView.innerHTML = `<p>データの取得に失敗しました: ${error.message}</p>`;
        }
    }

    function openSidebar() { /* ... */ }
    function closeSidebar() { /* ... */ }
    ayahView.addEventListener('click', (event) => { /* ... */ });
    closeSidebarButton.addEventListener('click', closeSidebar);


    // --- 初期化 ---
    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
