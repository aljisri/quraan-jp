// surah.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 要素の取得 ---
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const viewTitle = document.getElementById('view-title');
    const ayahView = document.getElementById('ayah-view');
    const closeSidebarButton = document.getElementById('close-sidebar');

    let currentSelectedAyah = null; // 現在選択中のアーヤを保持する変数

    // URLパスからスーラIDを取得する関数
    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    // スーラのデータを読み込む関数
    async function loadSurah(surahId) {
        // ... (この関数の中身は変更なし) ...
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

    // ★ 修正点：サイドバーを開閉する関数を明確化
    function openSidebar() {
        sidebar.classList.add('visible');
        mainContent.classList.add('sidebar-open');
    }

    function closeSidebar() {
        sidebar.classList.remove('visible');
        mainContent.classList.remove('sidebar-open');
        // 選択中のハイライトも解除
        if (currentSelectedAyah) {
            currentSelectedAyah.classList.remove('selected');
            currentSelectedAyah = null;
        }
    }

    // アーヤクリック時のイベント
    ayahView.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            const ayahId = ayahBox.dataset.ayahId;

            // 既に選択済みのものを再度クリックした場合は何もしない
            if (currentSelectedAyah === ayahBox) return;

            // 他の選択を解除
            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            
            // 新しくクリックされたアーヤをハイライト
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            // サイドバーを開いて情報を表示
            openSidebar();
            sidebarContent.innerHTML = `選択されたアーヤID: ${ayahId}<br>（ここに注釈データを読み込む処理を追加します）`;
        }
    });

    // 閉じるボタンのイベント
    closeSidebarButton.addEventListener('click', closeSidebar);

    // --- 初期化 ---
    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
