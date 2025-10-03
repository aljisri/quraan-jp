// surah.js
document.addEventListener('DOMContentLoaded', () => {
    // ★ 修正点: 正しい親要素を取得
    const pageContainer = document.getElementById('page-container');
    const ayahView = document.getElementById('ayah-view');
    const viewTitle = document.getElementById('view-title');
    const sidebar = document.getElementById('sidebar');
    let currentSelectedAyah = null;

    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    async function loadSurah(surahId) {
        try {
            // ★ 修正点: api.phpを呼び出す
            const response = await fetch(`api.php?surah=${surahId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }
            const ayahs = await response.json();

            // ★ 修正点: 正しいプロパティ名で章の名前を取得
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
            console.error(error);
            ayahView.innerHTML = `<p>データの取得に失敗しました。詳細はコンソールを確認してください。</p>`;
        }
    }
    
    // アーヤクリック時のイベント
    ayahView.addEventListener('click', (event) => {
        const ayahBox = event.target.closest('.ayah-box');
        if (ayahBox) {
            if (currentSelectedAyah === ayahBox) {
                // ★ 修正点: 正しい親要素のクラスを操作
                pageContainer.classList.remove('sidebar-open');
                sidebar.classList.remove('visible');
                currentSelectedAyah.classList.remove('selected');
                currentSelectedAyah = null;
                return;
            }

            if (currentSelectedAyah) {
                currentSelectedAyah.classList.remove('selected');
            }
            
            ayahBox.classList.add('selected');
            currentSelectedAyah = ayahBox;
            
            // ★ 修正点: 正しい親要素のクラスを操作
            pageContainer.classList.add('sidebar-open');
            sidebar.classList.add('visible');
        }
    });

    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
