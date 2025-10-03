// index.js
document.addEventListener('DOMContentLoaded', () => {
    const surahListView = document.getElementById('surah-list-view');

    async function displaySurahList() {
        try {
            // ★ 修正点: 呼び出し先をapi.phpに変更
            const response = await fetch('api.php'); 
            const surahs = await response.json();
            
            // ... (これ以降のコードは変更なし) ...
            surahListView.innerHTML = '';
            surahs.forEach(surah => {
                const link = document.createElement('a');
                link.className = 'surah-link';
                link.href = `/${surah.id}`; 
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

    displaySurahList();
});
