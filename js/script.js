let isPlaying = false;

function togglePlay() {
    isPlaying = !isPlaying;
    const icon = document.getElementById('playIcon');

    if (isPlaying) {
        icon.classList.replace('fa-play', 'fa-pause');
    } else {
        icon.classList.replace('fa-pause', 'fa-play');
    }
}

function toggleLike(btn) {
    btn.classList.toggle('active');
}