// index.js

document.addEventListener('DOMContentLoaded', () => {
    const surahListView = document.getElementById('surah-list-view');

    async function displaySurahList() {
        try {
            const response = await fetch('api-surahs.php');
            const surahs = await response.json();

            surahListView.innerHTML = '';
            surahs.forEach(surah => {
                const link = document.createElement('a');
                link.className = 'surah-link';
                
                // ★ 変更点：リンク先を /（スーラ番号）の形式に変更
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
