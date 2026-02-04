import { useNavigate } from "react-router-dom";
import StageCard from "../components/StageCard";

export default function Stages() {
  const nav = useNavigate();

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        🌈 Choose Your Stage
      </h1>

      <div style={styles.container}>
        <StageCard
          title="Easy"
          icon="🐣"
          color="#6BCB77"
          locked={false}
          onClick={() =>
            nav("/levels/easy")
          }
        />

        <StageCard
          title="Medium"
          icon="🦉"
          color="#FFD93D"
          locked={false}
          onClick={() =>
            nav("/levels/medium")
          }
        />

        <StageCard
          title="Hard"
          icon="🦁"
          color="#FF6B6B"
          locked={false}
          onClick={() =>
            nav("/levels/hard")
          }
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF7E6",
    paddingTop: 50
  },
  title: {
    textAlign: "center",
    color: "#FF8A00",
    fontSize: 36
  },
  container: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    gap: 40,
    flexWrap: "wrap"
  }
};
