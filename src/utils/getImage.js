// utils/getImage.js

const emojiMap = {
  // A
  apple: "1f34e",
  ant: "1f41c",
  axe: "1fa93",
  air: "1f32c",
  animal: "1f43e",

  // B
  ball: "26bd",
  bat: "1f987",
  bear: "1f43b",
  bee: "1f41d",
  bird: "1f426",

  // C
  cat: "1f431",
  cow: "1f42e",
  car: "1f697",
  cake: "1f382",

  // D
  dog: "1f436",
  duck: "1f986",
  drum: "1f941",

  // E
  elephant: "1f418",
  egg: "1f95a",

  // F
  fish: "1f41f",
  frog: "1f438",
  fan: "1faad",

  // G
  goat: "1f410",
  grapes: "1f347",

  // H
  hat: "1f3a9",
  horse: "1f434",

  // I
  ice: "1f9ca",
  igloo: "1f3e0",

  // J
  jug: "1f9f4",
  jeep: "1f699",

  // K
  kite: "1fa81",
  key: "1f511",

  // L
  lion: "1f981",
  leaf: "1f342",

  // M
  monkey: "1f412",
  mango: "1f96d",

  // N
  nest: "1fab9",

  // O
  owl: "1f989",
  orange: "1f34a",

  // P
  pig: "1f437",
  pen: "1f58a",

  // Q
  queen: "1f478",

  // R
  rabbit: "1f430",
  rose: "1f339",

  // S
  sun: "2600",
  snake: "1f40d",

  // T
  tiger: "1f405",
  tree: "1f333",

  // U
  umbrella: "2602",

  // V
  van: "1f690",

  // W
  whale: "1f433",
  watch: "231a",

  // X
  xylophone: "1fa97",

  // Y
  yak: "1f40f",

  // Z
  zebra: "1f993"
};

export function getWordImage(word) {
  const key = word?.toLowerCase();

  // 1️⃣ exact emoji
  if (emojiMap[key]) {
    return `https://twemoji.maxcdn.com/v/latest/svg/${emojiMap[key]}.svg`;
  }

  // 2️⃣ category fallback
  if (key?.includes("animal"))
    return "https://twemoji.maxcdn.com/v/latest/svg/1f43e.svg";

  if (key?.includes("fruit"))
    return "https://twemoji.maxcdn.com/v/latest/svg/1f34e.svg";

  if (key?.includes("vehicle"))
    return "https://twemoji.maxcdn.com/v/latest/svg/1f697.svg";

  // 3️⃣ final mascot fallback
  return "https://twemoji.maxcdn.com/v/latest/svg/1f41d.svg"; // 🐝
}
