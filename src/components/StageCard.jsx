export default function StageCard({
  title,
  color,
  icon,
  locked,
  onClick
}) {
  return (
    <div
      onClick={!locked ? onClick : null}
      style={{
        ...styles.card,
        background: locked ? "#ccc" : color,
        cursor: locked ? "not-allowed" : "pointer"
      }}
    >
      <div style={styles.icon}>
        {locked ? "🔒" : icon}
      </div>

      <h2>{title}</h2>

      <p>
        {locked
          ? "Locked"
          : "Tap to start"}
      </p>
    </div>
  );
}

const styles = {
  card: {
    width: 260,
    height: 180,
    borderRadius: 25,
    color: "white",
    padding: 20,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    transition: "0.3s"
  },
  icon: {
    fontSize: 60,
    marginBottom: 10
  }
};
