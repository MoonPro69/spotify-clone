document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.getElementById('playPause');
    const progressBar = document.getElementById('progress');
    const songTitle = document.getElementById('songTitle');
    const coverImage = document.getElementById('coverImage');
    const progressContainer = document.querySelector('.progressBar');

    // List of songs (replace with actual file paths)
    const songs = [
        { title: "Happy ", file: "songs/Happy Home.mp3", cover: "cover1.jpg" },
    ];

    let currentSongIndex = 0;

    // Function to update the song information
    function updateSongInfo() {
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        coverImage.src = currentSong.cover;
    }

    // Play or pause the audio
    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused || audioPlayer.ended) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="far fa-pause-circle"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="far fa-play-circle"></i>';
        }
    });

    // Play the next song
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audioPlayer.src = songs[currentSongIndex].file;
        audioPlayer.play();
        updateSongInfo();
        playPauseButton.innerHTML = '<i class="far fa-pause-circle"></i>';
    }

    // Play the previous song
    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audioPlayer.src = songs[currentSongIndex].file;
        audioPlayer.play();
        updateSongInfo();
        playPauseButton.innerHTML = '<i class="far fa-pause-circle"></i>';
    }

    // Update progress bar as the audio plays
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = progressPercent + '%';
    });

    // Click on progress bar to skip to that position
    progressContainer.addEventListener('click', function(e) {
        const progressWidth = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;

        audioPlayer.currentTime = (clickX / progressWidth) * duration;
    });

    // Play the next song when current song ends
    audioPlayer.addEventListener('ended', function() {
        playNextSong();
    });

    // Initialize the first song
    audioPlayer.src = songs[currentSongIndex].file;
    updateSongInfo();
});
