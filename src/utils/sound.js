// src/utils/sound.js
let bgMusic = null;

export const playBgMusic = () => {
  if (!bgMusic) {
    bgMusic = new Audio("/sounds/bg-music.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    window.__bgMusic = bgMusic; // 👈 IMPORTANT
  }
  bgMusic.play().catch(() => {});
};

export const stopBgMusic = () => {
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
};

export const playCorrect = () => {
  new Audio("/sounds/correct.mp3").play();
};

export const playWrong = () => {
  new Audio("/sounds/wrong.mp3").play();
};

export const playLevelComplete = () => {
  new Audio("/sounds/level-complete.mp3").play();
};

export const playClick = () => {
  new Audio("/sounds/click.mp3").play();
};
