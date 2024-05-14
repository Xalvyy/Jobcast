let isPlaying = false;
let playSelected = -1;

const episodes = [
  {
    title: "Hat Björn Gregor Recht?",
    guest: "Björn Gregor, Rechtsanwalt",
    duration: "15:42",
    info: "Interview mit Björn Gregor, einem Rechtsanwalt \
    in der Kanzlei blablabla. ",
  },
  {
    title: "Polizei: Dein Freund und Helfer?",
    guest: "Mit Björn Gregor",
    duration: "15:42",
    info: "Interview mit Björn Gregor, einem Rechtsanwalt \
    in der Kanzlei blablabla. ",
  },
  {
    title: "Kleines Kind, großes Potential",
    guest: "Björn Gregor, St. Kilian Schule",
    duration: "15:42",
    info: "Interview mit Björn Gregor, einem Rechtsanwalt \
    in der Kanzlei blablabla. ",
  },
  {
    title: "Lehrer - Pausengespräche",
    guest: "Mit Björn Gregor",
    duration: "15:42",
    info: "Interview mit Björn Gregor, einem Rechtsanwalt \
    in der Kanzlei blablabla. ",
  },
  {
    title: "Dem Indschenjör ist nix zu schwör!",
    guest: "Mit Björn Gregor",
    duration: "15:42",
    info: "Interview mit Björn Gregor, einem Rechtsanwalt \
    in der Kanzlei blablabla. ",
  },
];

let isInfoOpen = episodes.map((e) => false);

console.log(isInfoOpen);

// Function to generate HTML for each episode and append it to the container
function renderEpisodes() {
  const container = document.getElementById("episodes-container");

  episodes.forEach((episode) => {
    const episodeDiv = document.createElement("div");
    episodeDiv.classList.add("episode-container");

    episodeDiv.innerHTML = `
    <div class="episode">
        <div class="play-pause">
            <i class="fa-solid fa-play"></i>
        </div>
        <img src="jobcast-logo.png" alt="Episode Cover" class="icon" />
        <div class="title">
          <p>${episode.title}</p>
          <p>${episode.guest}</p>
        </div>
        <div class="duration">${episode.duration}</div>
        <i class="fa-solid fa-circle-info info-button"></i>
      </div>
      <div class="episode-info">
      ${episode.info}
      </div>
        `;

    container.appendChild(episodeDiv);
  });
}

renderEpisodes();

let playPauseButtons = document.getElementsByClassName("play-pause");
let titles = document.getElementsByClassName("title");
let pbControlPlayButton = document.getElementById("pb-play");

const updateEpisodePlayingState = (i) => {
  if (playSelected != -1) {
    document.getElementById("media-player").classList.add("activated");
    document.getElementById("media-player-spacer").classList.add("activated");
    for (let t of titles) {
      t.classList.remove("activated");
    }
    titles[i].classList.add("activated");
    document.getElementById("now-playing").innerHTML =
      episodes[playSelected].title;
  } else {
    document.getElementById("media-player").classList.remove("activated");
    document
      .getElementById("media-player-spacer")
      .classList.remove("activated");
    titles[i].classList.remove("activated");
  }
  playPauseButtons[i].innerHTML = isPlaying
    ? `<i class="fa-solid fa-pause"></i>`
    : `<i class="fa-solid fa-play"></i>`;
  if (isPlaying) {
    pbControlPlayButton.classList.remove("fa-play");
    pbControlPlayButton.classList.add("fa-pause");
  } else {
    pbControlPlayButton.classList.remove("fa-pause");
    pbControlPlayButton.classList.add("fa-play");
  }
};

const updateInfoDisplay = () => {
  for (let i = 0; i < isInfoOpen.length; i++) {
    if (isInfoOpen[i]) {
      document
        .getElementsByClassName("episode-info")
        [i].classList.add("activated");
    } else {
      document
        .getElementsByClassName("episode-info")
        [i].classList.remove("activated");
    }
  }
};

let updatePlayState = (i) => {
  if (playSelected == i) {
    isPlaying = !isPlaying;
    updateEpisodePlayingState(i);
    console.log(playSelected, isPlaying);
  } else {
    isPlaying = false;
    if (playSelected != -1) {
      updateEpisodePlayingState(playSelected);
    }
    playSelected = i;
    isPlaying = true;
    updateEpisodePlayingState(playSelected);
    console.log(playSelected, isPlaying);
  }
};

for (let i = 0; i < playPauseButtons.length; i++) {
  playPauseButtons[i].addEventListener(
    "click",
    () => {
      updatePlayState(i);
    },
    false
  );
}

document.getElementById("pb-play").addEventListener("click", () => {
  if (playSelected != -1) {
    updatePlayState(playSelected);
  }
});

document.getElementById("close").addEventListener(
  "click",
  () => {
    isPlaying = false;
    let temp = playSelected;
    playSelected = -1;
    updateEpisodePlayingState(temp);
  },
  false
);

document.getElementById("back").addEventListener(
  "click",
  () => {
    let temp = playSelected;
    playSelected = -1;
    isPlaying = false;
    updateEpisodePlayingState(temp);
    isPlaying = true;
    playSelected = temp == 0 ? episodes.length - 1 : temp - 1;
    updateEpisodePlayingState(playSelected);
  },
  false
);

document.getElementById("forward").addEventListener(
  "click",
  () => {
    let temp = playSelected;
    playSelected = -1;
    isPlaying = false;
    updateEpisodePlayingState(temp);
    isPlaying = true;
    playSelected = temp == episodes.length - 1 ? 0 : temp + 1;
    updateEpisodePlayingState(playSelected);
  },
  false
);

for (let i = 0; i < isInfoOpen.length; i++) {
  document
    .getElementsByClassName("info-button")
    [i].addEventListener("click", () => {
      isInfoOpen[i] = !isInfoOpen[i];
      updateInfoDisplay();
    });
}
