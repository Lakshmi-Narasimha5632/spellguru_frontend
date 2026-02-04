import { motion } from "framer-motion";

export default function AnimatedBee({ state }) {
  const animations = {
    idle: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    },

    correct: {
      scale: [1, 1.3, 1],
      rotate: [0, 360],
      y: [0, -40, 0],
      transition: {
        duration: 0.8
      }
    },

    wrong: {
      x: [-20, 20, -20, 20, 0],
      rotate: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.6
      }
    },

    listening: {
      rotate: [-5, 5, -5],
      transition: {
        repeat: Infinity,
        duration: 0.6
      }
    },

    speaking: {
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        duration: 0.5
      }
    }
  };

  return (
    <motion.img
      src="/bee.png"
      alt="bee"
      style={{
        width: 160,
        height: 160,
        margin: "20px auto",
        display: "block"
      }}
      animate={animations[state] || animations.idle}
    />
  );
}
