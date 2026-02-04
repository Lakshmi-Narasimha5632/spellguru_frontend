import { motion } from "framer-motion";

export default function DailyReward({
  streak,
  onClose
}) {
  return (
    <div style={styles.overlay}>
      <motion.div
        style={styles.box}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        🎁

        <h1>Daily Reward!</h1>

        <p>
          🔥 Streak: <b>{streak} days</b>
        </p>

        <p>⭐ +5 Bonus Stars</p>

        <button
          style={styles.btn}
          onClick={onClose}
        >
          Collect 🎉
        </button>
      </motion.div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  box: {
    background: "#FFF7E6",
    padding: 40,
    borderRadius: 30,
    textAlign: "center",
    fontSize: 28
  },
  btn: {
    marginTop: 20,
    background: "#FF8A00",
    color: "white",
    border: "none",
    padding: "12px 35px",
    borderRadius: 30,
    fontSize: 18
  }
};
