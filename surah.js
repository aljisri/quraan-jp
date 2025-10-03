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
    
    async function loadSurah(surahId) {
        try {
            const response = await fetch(`api.php?surah=${surahId}`);
            const ayahs = await response.json();

            if (ayahs.length > 0) {
                const surahName = ayahs[0].surah_name_japanese;
                if (surahName) {
                    viewTitle.textContent = `${surahId}. ${surahName}`;
                    document.title = `Quraan.jp - ${surahName}`;
                } else {
                     viewTitle.textContent = `第${surahId}章`;
                }
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
            ayahView.innerHTML = `<p>データの取得に失敗しました。</p>`;
        }
    }

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
                closeSidebar();
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
