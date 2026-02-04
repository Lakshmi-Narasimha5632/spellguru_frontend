import { useNavigate, useParams } from "react-router-dom";
import { playBgMusic } from "../utils/sound";
export default function LevelCompleted() {
  const { stage, level } = useParams();
  const nav = useNavigate();
  playBgMusic();
  return (
    <div style={styles.page}>
      <h1>🎉 Level Completed!</h1>

      <h2>
        Stage: {stage.toUpperCase()}
      </h2>

      <h3>
        Level {level} finished successfully
      </h3>

      <button
        style={styles.btn}
        onClick={() =>
          nav(
            `/game/${stage}/${Number(level) + 1}`
          )
        }
      >
        ▶ Next Level
      </button>

      <button
        style={styles.home}
        onClick={() => nav("/levels/" + stage)}
      >
        🔙 Back to Levels
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF7E6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  btn: {
    marginTop: 25,
    background: "#6BCB77",
    color: "white",
    border: "none",
    padding: "14px 40px",
    borderRadius: 25,
    fontSize: 20,
    cursor: "pointer"
  },
  home: {
    marginTop: 15,
    background: "#FF8A00",
    color: "white",
    border: "none",
    padding: "12px 35px",
    borderRadius: 25,
    fontSize: 18
  }
};
