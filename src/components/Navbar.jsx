import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <div style={styles.nav}>
      <button
        style={styles.startBtn}
        onClick={() => nav("/")}
      >
        🚀 SpellGuru
      </button>

      <div style={styles.right}>
        <button
          style={styles.link}
          onClick={() => nav("/profile")}
        >
          👤 Profile
        </button>

        <button
          style={styles.logout}
          onClick={() => {
            localStorage.clear();
            nav("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    background: "#FFF3D9",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    zIndex: 100
  },

  startBtn: {
    background: "#FF8A00",
    color: "white",
    border: "none",
    padding: "12px 28px",
    borderRadius: 40,
    fontSize: 18,
    fontWeight: "bold"
  },

  right: {
    display: "flex",
    gap: 15
  },

  link: {
    background: "white",
    border: "2px solid #FF8A00",
    padding: "10px 22px",
    borderRadius: 30,
    color: "#FF8A00",
    fontSize: 16
  },

  logout: {
    background: "#FF6B6B",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: 30,
    fontSize: 16
  }
};
