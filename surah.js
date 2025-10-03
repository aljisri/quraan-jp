// surah.js

document.addEventListener('DOMContentLoaded', () => {
    // page-wrapperはCSSでのみ使い、JSではmain-containerを基準にする
    const mainContainer = document.querySelector('.main-container');
    const ayahView = document.getElementById('ayah-view');
    const viewTitle = document.getElementById('view-title');
    let currentSelectedAyah = null;

    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    async function loadSurah(surahId) {
        try {
            const response = await fetch(`api.php?surah=${surahId}`);
            const ayahs = await response.json();

            // ★ バグ修正：正しいプロパティ名で章の名前を取得
            if (ayahs.length > 0) {
                // api.phpから返されるsurah_name_japaneseを使う
                const surahName = ayahs[0].surah_name_japanese;
                // 表示形式をご要望に合わせる
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
            // サイドバーを閉じるロジック
            if (currentSelectedAyah === ayahBox) {
                mainContainer.classList.remove('sidebar-open');
                currentSelectedAyah.classList.remove('selected');
                currentSelectedAyah = null;
                return;
            }

            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            // サイドバーを開く
            mainContainer.classList.add('sidebar-open');
            // ここに注釈データを読み込む処理を追加
        }
    });

    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
