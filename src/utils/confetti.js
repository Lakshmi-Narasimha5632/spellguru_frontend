import confetti from "canvas-confetti";

export const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });

  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0 }
  });

  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1 }
  });
};
