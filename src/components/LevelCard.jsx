import { motion } from "framer-motion";

export default function LevelCard({
  level,
  stars,
  locked,
  onClick
}) {
  return (
    <motion.div
      whileHover={
        !locked ? { scale: 1.05 } : {}
      }
      style={{
        background: locked
          ? "#FFF3E0"
          : "white",
        borderRadius: 25,
        padding: 20,
        textAlign: "center",
        cursor: locked
          ? "not-allowed"
          : "pointer",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.15)",
        opacity: locked ? 0.6 : 1
      }}
      onClick={!locked ? onClick : null}
    >
      <h3>Level {level}</h3>

      {locked ? (
        <div style={{ fontSize: 28 }}>
          🔒
        </div>
      ) : (
        <div>
          {[1, 2, 3].map((n) => (
            <motion.span
              key={n}
              animate={
                n <= stars
                  ? {
                      scale: [0.5, 1.4, 1]
                    }
                  : {}
              }
              transition={{
                duration: 0.4
              }}
              style={{
                fontSize: 18,
                margin: "0 3px",
                color:
                  n <= stars
                    ? "#FFD700"
                    : "#ddd"
              }}
            >
              ⭐
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
