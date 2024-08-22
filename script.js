"use strict";
const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("musric_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "Assets/Muzic/Chaar Botal Vodka Full Song Feat. Yo Yo Honey Singh_ Sunny Leone _ Ragini MMS 2(MP3_70K).mp3",
    displayName: "Chaar Botal Vodka",
    cover: "Assets/Thumbnails/chaarBotalVodkaYoYoHoneySingh.jpg",
    artist: "Yo Yo Honey Singh",
  },
  {
    path: "Assets/Muzic/Ik Saal.mp3",
    displayName: "Ik Saal",
    cover: "Assets/Thumbnails/Ik-Saal-jassiGill.jpg",
    artist: "Jassi Gill",
  },
  {
    path: "Assets/Muzic/Chhapaak - Title Track(bossmobi).mp3",
    displayName: "Bossmobi",
    cover: "Assets/Thumbnails/Chhapaak.jpg",
    artist: "Arijit Singh",
  },
  {
    path: "Assets/Muzic/FOTTY SEVEN - HAATH TOH LAGA ft. REBEL 7 _ ASLI INDEPENDENT EP _ KALAMKAAR(MP3_70K)_1.mp3",
    displayName: "Haath Toh Laga",
    cover: "Assets/Thumbnails/hathToLaga47.jpg",
    artist: "Fotty Seven ft. Rebel 7",
  },
  {
    path: "Assets/Muzic/EMIWAY - FIRSE MACHAYENGE (OFFICIAL MUSIC VIDEO)(MP3_70K).mp3",
    displayName: "Firse Machayenge",
    cover: "Assets/Thumbnails/Firse-Machayenge.jpg",
    artist: "Emiway Bantai",
  },
  {
    path: "Assets/Muzic/Dhuaan Fugly 128 Kbps.mp3",
    displayName: "Dhuaan",
    cover: "Assets/Thumbnails/dhuaan-ArijitSingh.jpg",
    artist: "Arijit Singh",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
  musicArtistEl.textContent = songs.artist;
  imgCoverEl.src = songs.cover;
  imgEl.src = songs.cover;
}

//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}

function updateVolumeIcon() {
  const volume = music.volume;
  if (volume === 0) {
    volumeIconEl.classList.remove('fa-volume-high', 'fa-volume-low');
    volumeIconEl.classList.add('fa-volume-mute');
  } else if (volume > 0 && volume <= 0.5) {
    volumeIconEl.classList.remove('fa-volume-high', 'fa-volume-mute');
    volumeIconEl.classList.add('fa-volume-low');
  } else {
    volumeIconEl.classList.remove('fa-volume-low', 'fa-volume-mute');
    volumeIconEl.classList.add('fa-volume-high');
  }
}

//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);