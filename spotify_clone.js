console.log("Welcome to Spotify");
// Initialise the variation
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterplay = document.getElementById("masterplay");
let myProgress = document.getElementById("myProgress");
let gif = document.getElementById("gif");
let masterSong = document.getElementById("masterSong");
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Chennai Express",
    filepath: "1.mp3",
    coverPath: "kashmir me.jpg",
  },
  {
    songName: "Let Me Love You",
    filepath: "2.mp3",
    coverPath: "4.jpg",
  },
  {
    songName: "Chitiya Kaliyan",
    filepath: "3.mp3",
    coverPath: "kalaya.jpg",
  },
  {
    songName: "bom dig bom",
    filepath: "4.mp3",
    coverPath: "3.jpg",
  },
];
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();
// handle play pause
masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterplay.classList.remove("fa-circle-pause");
    masterplay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
// listen to Events

// Update progress bar as the song plays
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgress.value = progress;
});

myProgress.addEventListener("change", () => {
  audioElement.currentTime = (myProgress.value * audioElement.duration) / 100;
});

// othe playlist

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `/${songIndex + 1}.mp3`;
      masterSong.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterplay.classList.remove("fa-circle-play");
      masterplay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 3) {
    // assuming you have 4 songs (0 to 3)
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  masterSong.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterplay.classList.remove("fa-circle-play");
  masterplay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 3; // assuming you have 4 songs (0 to 3)
  } else {
    songIndex -= 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  masterSong.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterplay.classList.remove("fa-circle-play");
  masterplay.classList.add("fa-circle-pause");
});
