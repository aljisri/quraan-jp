// surah.js
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const ayahView = document.getElementById('ayah-view');
    const viewTitle = document.getElementById('view-title');
    const sidebarCloseButton = document.getElementById('sidebar-close-button');
    let currentSelectedAyah = null;

    function getSurahIdFromURL() {
        const path = window.location.pathname.replace('/', '');
        const surahId = parseInt(path, 10);
        return !isNaN(surahId) && surahId > 0 ? surahId : 1;
    }
    
    async function loadSurah(surahId) {
      // ... (This function remains the same as the working version)
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
    
    sidebarCloseButton.addEventListener('click', closeSidebar);

    const surahId = getSurahIdFromURL();
    loadSurah(surahId);
});
