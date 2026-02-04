import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { playBgMusic } from "../utils/sound";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.center}>
        <h1 style={styles.logo}>🐝 SpellGuru</h1>

        <p style={styles.tagline}>
          Learn spellings with fun & games!
        </p>

        <div style={styles.desc}>
          <span>🎨 Colorful learning</span>
          <span>🎙️ Speak & listen</span>
          <span>🧠 Smart AI practice</span>
          <span>🎁 Gifts & rewards</span>
        </div>

        {/* ✅ START BUTTON */}
        <button
          style={styles.startBtn}
          onClick={() => {
            playBgMusic();        // 🎵 Start music (user gesture)
            navigate("/stages");  // ➡️ Go to stages
          }}
        >
          ▶ Start Learning
        </button>
      </div>
    </div>
  );
}

/* ===============================
   STYLES
=============================== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#FFF7E6,#FFE8C2)",
    display: "flex",
    flexDirection: "column"
  },

  center: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 20
  },

  logo: {
    fontSize: "clamp(36px, 8vw, 60px)",
    color: "#FF8A00",
    marginBottom: 10,
    fontWeight: "bold"
  },

  tagline: {
    fontSize: "clamp(18px, 4vw, 22px)",
    color: "#444",
    marginBottom: 20
  },

  desc: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    fontSize: "clamp(15px, 3.5vw, 18px)",
    color: "#555",
    maxWidth: 700,
    lineHeight: 1.8,
    marginBottom: 30
  },

  startBtn: {
    background: "#FF8A00",
    color: "white",
    border: "none",
    padding: "15px 40px",
    fontSize: 20,
    borderRadius: 30,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  }
};
