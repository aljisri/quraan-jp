// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 要素の取得 ---
    const mainContent = document.getElementById('main-content');
    const sidebar = document.getElementById('sidebar');
    const sidebarContent = document.getElementById('sidebar-content');
    const viewTitle = document.getElementById('view-title');
    
    const surahListView = document.getElementById('surah-list-view');
    const ayahView = document.getElementById('ayah-view');

    const backButton = document.getElementById('back-to-surah-list');
    const closeSidebarButton = document.getElementById('close-sidebar');

    let currentSelectedAyah = null; // 現在選択中のアーヤを保持する変数

    // --- 関数定義 ---

    // 全てのスーラのリストを表示する関数
    async function displaySurahList() {
        showView('surah-list'); // スーラ一覧表示に切り替え
        try {
            const response = await fetch('api_surahs.php');
            const surahs = await response.json();

            surahListView.innerHTML = ''; // クリア
            surahs.forEach(surah => {
                const link = document.createElement('a');
                link.className = 'surah-link';
                link.dataset.surahId = surah.id;
                link.innerHTML = `
                    <h3>${surah.id}. ${surah.name_japanese}</h3>
                    <div class="surah-info">${surah.name_arabic} - ${surah.total_ayahs} Ayahs</div>
                `;
                surahListView.appendChild(link);
            });
        } catch (error) {
            surahListView.innerHTML = `<p>スーラリストの読み込みに失敗しました: ${error.message}</p>`;
        }
    }

    // 指定されたスーラのアーヤを読み込む関数
    async function loadSurah(surahId) {
        showView('ayah'); // アーヤ表示に切り替え
        try {
            ayahView.innerHTML = '<p>読み込み中...</p>';
            const response = await fetch(`api.php?surah=${surahId}`);
            const ayahs = await response.json();

            if (ayahs.length > 0) {
                viewTitle.textContent = `第${ayahs[0].surah_id}章 ${ayahs[0].surah_name_japanese}`;
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

    // 表示するビューを切り替える関数
    function showView(viewName) {
        if (viewName === 'surah-list') {
            surahListView.style.display = 'grid';
            ayahView.style.display = 'none';
            backButton.style.display = 'none';
            viewTitle.textContent = 'スーラ選択';
            closeSidebar(); // スーラ一覧に戻ったらサイドバーを閉じる
        } else if (viewName === 'ayah') {
            surahListView.style.display = 'none';
            ayahView.style.display = 'block';
            backButton.style.display = 'inline-block';
        }
    }

    // サイドバーを開く/閉じる関数
    function openSidebar() {
        sidebar.classList.add('visible');
        mainContent.classList.add('sidebar-open');
    }
    function closeSidebar() {
        sidebar.classList.remove('visible');
        mainContent.classList.remove('sidebar-open');
    }

    // --- イベントリスナー ---

    // スーラ一覧のクリックイベント
    surahListView.addEventListener('click', (event) => {
        const surahLink = event.target.closest('.surah-link');
        if (surahLink) {
            const surahId = surahLink.dataset.surahId;
            loadSurah(surahId);
        }
    });

    // アーヤ表示エリアのクリックイベント
    ayahView.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            const ayahId = ayahBox.dataset.ayahId;

            // 他の選択を解除
            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            // クリックされたアーヤをハイライト
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            // サイドバーを開く
            openSidebar();
            sidebarContent.innerHTML = `選択されたアーヤID: ${ayahId}<br>（ここに注釈データを読み込む処理を追加します）`;
        }
    });

    // 「スーラ一覧へ」ボタンのクリックイベント
    backButton.addEventListener('click', displaySurahList);

    // サイドバーの閉じるボタンのクリックイベント
    closeSidebarButton.addEventListener('click', closeSidebar);

    // --- 初期化 ---
    displaySurahList();
});
