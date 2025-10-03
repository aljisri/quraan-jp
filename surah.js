// surah.js
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const ayahView = document.getElementById('ayah-view');
    const viewTitle = document.getElementById('view-title');
    const sidebarCloseButton = document.getElementById('sidebar-close-button'); // ★ 修正点: ボタンを取得
    let currentSelectedAyah = null;

    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    // ... loadSurah 関数は変更なし ...
    async function loadSurah(surahId) {
      // ...
    }

    // ★ 修正点: 閉じるロジックを関数化
    function closeSidebar() {
        body.classList.remove('sidebar-open');
        if (currentSelectedAyah) {
            currentSelectedAyah.classList.remove('selected');
            currentSelectedAyah = null;
        }
    }
    
    ayahView.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            if (currentSelectedAyah === ayahBox) {
                closeSidebar(); // 関数を呼び出す
                return;
            }

            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            body.classList.add('sidebar-open');
        }
    });
    
    // ★ 修正点: サイドバーの閉じるボタンにイベントを追加
    sidebarCloseButton.addEventListener('click', closeSidebar);

    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
