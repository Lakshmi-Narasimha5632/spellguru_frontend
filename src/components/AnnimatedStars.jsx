import { motion } from "framer-motion";

export default function AnimatedStars({ count = 0 }) {
  return (
    <div style={styles.row}>
      {[1, 2, 3].map((num) => (
        <motion.span
          key={num}
          initial={{ scale: 0.4, opacity: 0.3 }}
          animate={
            num <= count
              ? {
                  scale: [0.4, 1.5, 1],
                  opacity: 1
                }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: num * 0.2
          }}
          style={{
            fontSize: 42,
            margin: "0 6px",
            color:
              num <= count
                ? "#FFD700"
                : "#ccc",
            textShadow:
              num <= count
                ? "0 0 12px gold"
                : "none"
          }}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
}

const styles = {
  row: {
    margin: "15px 0"
  }
};
