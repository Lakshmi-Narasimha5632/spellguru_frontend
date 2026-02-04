import { motion } from "framer-motion";

export default function GiftPopup({ onNext }) {

  const playGiftSound = () => {
    const audio = new Audio("/sounds/gift.mp3");
    audio.play();
  };

  return (
    <div style={styles.overlay}>
      <motion.div
        style={styles.box}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        🎁

        <h1>Congratulations!</h1>
        <h3>You completed the level!</h3>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={styles.btn}
          onClick={() => {
            playGiftSound();
            onNext();
          }}
        >
          🎵 Next Level →
        </motion.button>
      </motion.div>
    </div>
  );
}


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
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
    fontSize: 50
  },
  btn: {
    marginTop: 20,
    background: "#FF8A00",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: 25,
    fontSize: 18,
    cursor: "pointer"
  }
};
