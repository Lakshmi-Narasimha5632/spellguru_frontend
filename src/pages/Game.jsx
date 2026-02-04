import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import AnimatedBee from "../components/AnimatedBee";
import AnimatedStars from "../components/AnnimatedStars";
import { fireConfetti } from "../utils/confetti";
import {
  playCorrect,
  playWrong,
  playLevelComplete,
  stopBgMusic
} from "../utils/sound";

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export default function Game() {
  const { stage, level } = useParams();
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");
  const [beeState, setBeeState] = useState("idle");
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* 🔇 Stop BG music on game page */
  useEffect(() => {
  stopBgMusic(); // 🔇 Stop music when entering game

  return () => {
    // 🔊 Resume music when leaving game
    const audio = window.__bgMusic;
    if (audio) {
      audio.play().catch(() => {});
    }
  };
}, []);


  /* 🔁 Reset when level changes */
  useEffect(() => {
    setIndex(0);
    setWord("");
    setResult("");
    setStars(0);
    setBeeState("idle");
  }, [level]);

  /* 📥 Load progress per level */
  useEffect(() => {
    API.get(`/api/progress?stage=${stage}&level=${level}`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        const saved =
          typeof res.data?.letterIndex === "number" &&
          res.data.letterIndex < 26
            ? res.data.letterIndex
            : 0;

        setIndex(saved);
        setStars(Math.min(3, res.data?.stars || 0));
      })
      .catch(() => {
        setIndex(0);
        setStars(0);
      });
  }, [stage, level, token]);

  /* 🔤 Load word */
  useEffect(() => {
    if (index >= 26) return;

    setLoading(true);
    setBeeState("idle");

    API.get(`/api/game/word?stage=${stage}&index=${index}&level=${level}`)
      .then((res) => {
        setWord(res.data?.word || "");
      })
      .finally(() => setLoading(false));
  }, [index, stage, level]);

  /* 🔊 Speak */
  const speak = () => {
    if (!word) return;

    setBeeState("speaking");

    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    u.rate = 0.8;

    u.onend = () => setBeeState("idle");

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  /* 🎙 Listen */
  const listen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Speech recognition not supported");

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recog = new SR();
    recognitionRef.current = recog;

    recog.lang = "en-US";
    recog.start();
    setBeeState("listening");

    recog.onresult = async (e) => {
      recog.stop();

      const spoken = e.results[0][0].transcript
        .toLowerCase()
        .replace(/\s+/g, "");

      const correct = word.toLowerCase();
      const nextIndex = index + 1;

      /* ✅ CORRECT */
      if (spoken === correct) {
        setBeeState("correct");
        setResult("✅ Correct!");
        playCorrect();

        const newStars = Math.min(3, stars + 0.125);
        setStars(newStars);

        /* 🏁 Level completed */
        if (nextIndex >= 26) {
          await API.post(
            "/api/progress/update",
            { stage, level: Number(level), letterIndex: 26, stars: 3 },
            { headers: { Authorization: "Bearer " + token } }
          );

          playLevelComplete();
          fireConfetti();

          setTimeout(() => {
            navigate(`/completed/${stage}/${level}`);
          }, 2500);
          return;
        }

        await API.post(
          "/api/progress/update",
          {
            stage,
            level: Number(level),
            letterIndex: nextIndex,
            stars: 1
          },
          { headers: { Authorization: "Bearer " + token } }
        );

        setTimeout(() => {
          setResult("");
          setBeeState("idle");
          setIndex(nextIndex);
        }, 700);
      }

      /* ❌ WRONG */
      else {
        setBeeState("wrong");
        setResult(`❌ Wrong! Correct spelling: "${word}"`);
        playWrong();

        await API.post(
          "/api/progress/update",
          {
            stage,
            level: Number(level),
            letterIndex: nextIndex,
            stars: 0
          },
          { headers: { Authorization: "Bearer " + token } }
        );

        setTimeout(() => {
          setResult("");
          setBeeState("idle");
          setIndex(nextIndex);
        }, 2500);
      }
    };
  };

  /* 🎮 UI */
  return (
    <div style={styles.page}>
      <motion.div style={styles.card} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
        <h3>Level {level} — {stage.toUpperCase()}</h3>

        <motion.h1
          key={index}
          style={styles.letter}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {alphabet[index].toUpperCase()}
        </motion.h1>

        <AnimatedBee state={beeState} />
        <AnimatedStars count={stars} />

        <p>Spell the word that starts with this letter</p>

        <div>
          <button onClick={speak} style={styles.listen}>🔊 Play Word</button>
          <button onClick={listen} style={styles.speak}>🎙 Speak</button>
        </div>

        <h3>{result}</h3>

        <div style={styles.progress}>
          {alphabet.map((l, i) => (
            <span key={i} style={{ color: i < index ? "#FF8A00" : "#ccc" }}>
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    background: "#FFF7E6",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 420,
    background: "white",
    borderRadius: 30,
    padding: 30,
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
  },
  letter: {
    fontSize: 64,
    color: "#FF8A00"
  },
  listen: {
    background: "#4D96FF",
    color: "white",
    border: "none",
    padding: "12px 25px",
    margin: 10,
    borderRadius: 20,
    cursor: "pointer"
  },
  speak: {
    background: "#6BCB77",
    color: "white",
    border: "none",
    padding: "12px 25px",
    margin: 10,
    borderRadius: 20,
    cursor: "pointer"
  },
  progress: {
    marginTop: 15,
    letterSpacing: 2
  }
};
