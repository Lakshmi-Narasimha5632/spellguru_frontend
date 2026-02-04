import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      nav("/stages");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <img
          src="/bee.png"
          alt="bee"
          className="bee-float"
        />

        <h1 className="auth-title">Welcome Back 🐝</h1>
        <p className="auth-sub">
          Let’s continue learning spellings!
        </p>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="auth-btn">
          Login 🚀
        </button>

        <p className="auth-link">
          New here?{" "}
          <span onClick={() => nav("/register")}>
            Create account
          </span>
        </p>
      </form>
    </div>
  );
}
