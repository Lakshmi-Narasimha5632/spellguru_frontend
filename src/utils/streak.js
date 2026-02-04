export const updateStreak = () => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const lastPlayed =
    localStorage.getItem("lastPlayed");

  let streak = Number(
    localStorage.getItem("streak") || 0
  );

  if (!lastPlayed) {
    streak = 1;
  } else {
    const diff =
      (new Date(today) -
        new Date(lastPlayed)) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak += 1;
    } else if (diff > 1) {
      streak = 1;
    }
  }

  localStorage.setItem(
    "lastPlayed",
    today
  );
  localStorage.setItem("streak", streak);

  return streak;
};
