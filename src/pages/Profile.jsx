import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [progress, setProgress] = useState({
    easy: null,
    medium: null,
    hard: null
  });

  const [totalStars, setTotalStars] = useState(0);
  const [levelsPlayed, setLevelsPlayed] = useState(0);

  /* ===============================
     LOAD USER + PROFILE PROGRESS
  =============================== */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/api/auth/me", {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error("User load failed");
      }
    };

    const loadProfileProgress = async () => {
      try {
        const res = await API.get("/api/progress/profile", {
          headers: {
            Authorization: "Bearer " + token
          }
        });

        setProgress({
          easy: res.data.easy,
          medium: res.data.medium,
          hard: res.data.hard
        });

        setTotalStars(res.data.totalStars || 0);
        setLevelsPlayed(res.data.levelsPlayed || 0);
      } catch (err) {
        console.error("Progress load error");
      }
    };

    loadUser();
    loadProfileProgress();
  }, [token]);

  /* ===============================
     UI CARD
  =============================== */
  const renderStage = (title, data) => {
    if (!data) {
      return (
        <div style={styles.card}>
          Loading...
        </div>
      );
    }

    return (
      <div style={styles.card}>
        <h3>{title}</h3>

        <p>
          🎯 Current Level: <b>{data.currentLevel}</b>
        </p>

        <p>
          🔤 Letters Completed:{" "}
          <b>{data.letterIndex}/26</b>
        </p>

        <p>
          ⭐ Stars: <b>{data.stars}</b>
        </p>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>👤 My Profile</h1>

      {/* USER CARD */}
      {user && (
        <div style={styles.userCard}>
          <div style={styles.avatar}>👦</div>

          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <div style={styles.stats}>
            <span>
              ⭐ Total Stars: <b>{totalStars}</b>
            </span>

            <span>
              🎮 Levels Played: <b>{levelsPlayed}</b>
            </span>
          </div>
        </div>
      )}

      {/* STAGE CARDS */}
      <div style={styles.grid}>
        {renderStage("Easy", progress.easy)}
        {renderStage("Medium", progress.medium)}
        {renderStage("Hard", progress.hard)}
      </div>
    </div>
  );
}

/* ===============================
   STYLES
=============================== */
const styles = {
  page: {
    background: "#FFF7E6",
    minHeight: "100vh",
    padding: 40
  },

  title: {
    textAlign: "center",
    color: "#FF8A00",
    marginBottom: 30
  },

  userCard: {
    background: "white",
    width: 420,
    margin: "0 auto 40px",
    padding: 30,
    borderRadius: 30,
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "#FFE0B2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    margin: "0 auto 10px"
  },

  stats: {
    marginTop: 15,
    display: "flex",
    justifyContent: "space-around",
    fontWeight: "bold",
    color: "#FF8A00"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
    gap: 25
  },

  card: {
    background: "white",
    padding: 25,
    borderRadius: 25,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
  }
};
