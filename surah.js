// surah.js

document.addEventListener('DOMContentLoaded', () => {
    const pageWrapper = document.getElementById('page-wrapper');
    const ayahView = document.getElementById('ayah-view');
    const viewTitle = document.getElementById('view-title');
    let currentSelectedAyah = null;

    // URLからスーラIDを取得する関数
    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    // スーラのデータを読み込む関数
    async function loadSurah(surahId) {
        try {
            const response = await fetch(`api.php?surah=${surahId}`);
            const ayahs = await response.json();

            // ★ バグ修正：正しいプロパティ名で章の名前を取得
            if (ayahs.length > 0) {
                const surahName = ayahs[0].surah_name_japanese;
                viewTitle.textContent = `${surahId}. ${surahName}`;
                document.title = `Quraan.jp - ${surahName}`;
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
    
    // アーヤクリック時のイベント
    ayahView.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            // もしクリックされたのが既に選択中のアーヤなら、サイドバーを閉じる
            if (currentSelectedAyah === ayahBox) {
                pageWrapper.classList.remove('sidebar-open');
                currentSelectedAyah.classList.remove('selected');
                currentSelectedAyah = null;
                return;
            }

            // 他のアーヤが選択されていたらハイライトを解除
            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            
            // 新しくクリックされたアーヤをハイライト
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            // サイドバーを開く
            pageWrapper.classList.add('sidebar-open');
            // サイドバーに情報を表示する処理はここに書く
        }
    });

    // --- 初期化 ---
    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
