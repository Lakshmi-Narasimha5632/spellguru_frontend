import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password
      });

      nav("/login");
    } catch {
      setError("User already exists");
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

        <h1 className="auth-title">
          Join SpellBee 🐝
        </h1>

        <p className="auth-sub">
          Start your fun learning journey!
        </p>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        <input
          className="auth-input"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          Register 🎉
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
