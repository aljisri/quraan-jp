// script.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const sidebarContent = document.getElementById('sidebar-content');

    // 指定されたスーラのデータをAPIから読み込む関数
    async function loadSurah(surahId) {
        try {
            const response = await fetch(`api.php?surah=${surahId}`);
            if (!response.ok) {
                throw new Error('データの取得に失敗しました。');
            }
            const ayahs = await response.json();

            // 取得したデータでHTMLを生成
            mainContent.innerHTML = ''; // コンテンツをクリア
            ayahs.forEach(ayah => {
                const ayahBox = document.createElement('div');
                ayahBox.className = 'ayah-box';
                // 各アーヤの情報をdata属性として埋め込む
                ayahBox.dataset.ayahId = ayah.id;

                ayahBox.innerHTML = `
                    <p class="ayah-number">${ayah.surah_id}:${ayah.ayah_number}</p>
                    <p class="arabic-text">${ayah.text_arabic}</p>
                    <p class="japanese-text">${ayah.text_japanese}</p>
                `;
                mainContent.appendChild(ayahBox);
            });
        } catch (error) {
            mainContent.innerHTML = `<p>${error.message}</p>`;
        }
    }

    // アーヤのボックスがクリックされた時の処理
    mainContent.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            const ayahId = ayahBox.dataset.ayahId;
            sidebarContent.innerHTML = `選択されたアーヤID: ${ayahId}<br>（ここに注釈データを読み込む処理を追加します）`;
            
            // 選択中のアーヤをハイライトする処理（後で追加）
        }
    });

    // 初期読み込み (第1章ファーティハ章)
    loadSurah(1);
});
