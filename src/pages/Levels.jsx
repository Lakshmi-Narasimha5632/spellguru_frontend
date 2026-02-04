import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import LevelCard from "../components/LevelCard";

export default function Levels() {
  const { stage } = useParams();
  const navigate = useNavigate();

  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  // unlimited levels
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  /* ===============================
     LOAD COMPLETED LEVELS
  =============================== */
  useEffect(() => {
    API.get(
  `/api/progress/all?stage=${stage}`,
  {
    headers: {
      Authorization:
        "Bearer " + localStorage.getItem("token")
    }
  }
)

      .then((res) => {
        setCompleted(res.data);
      })
      .finally(() => setLoading(false));
  }, [stage]);

  if (loading) return <h2>Loading...</h2>;

  // 🔥 highest completed level
  const completedLevels = completed.map(
    (p) => p.level
  );

  const highestCompleted =
    completedLevels.length > 0
      ? Math.max(...completedLevels)
      : 0;

  const unlockedLevel = highestCompleted + 1;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        {stage.toUpperCase()} LEVELS
      </h1>

      <div style={styles.grid}>
        {levels.map((level) => {
          const isCompleted =
            completedLevels.includes(level);

          const isUnlocked =
            level <= unlockedLevel;

          return (
            <LevelCard
              key={level}
              level={level}
              stars={isCompleted ? 3 : 0}
              locked={!isUnlocked}
              onClick={() =>
                navigate(`/game/${stage}/${level}`)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFF7E6",
    padding: 30
  },
  title: {
    textAlign: "center",
    color: "#FF8A00",
    marginBottom: 30
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(100px, 1fr))",
    gap: 20
  }
};
