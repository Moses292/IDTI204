import { useState } from "react";
import API_URL from "../api";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";

function Login({ onAuthSuccess, setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {

if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.user) {
      if (data.user) {
  const stored = localStorage.getItem("user");

  if (stored) {
    const fullUser = JSON.parse(stored);
    onAuthSuccess(fullUser);
  } else {
    onAuthSuccess(data.user);
  }
}
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
  <div className="auth-card">

    <img src="/main_logo.png" className="auth-logo" alt="logo" />

    <h2>Welcome Back!</h2>
    <p className="auth-sub">Login to your account</p>

 <div className="auth-body">

    {/* FORM SECTION */}
    <div className="auth-form">

      <div className="input-box">
        <FaEnvelope className="input-icon" />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-box">
        <FaLock className="input-icon" />
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaEye className="eye-icon" onClick={() => setShow(!show)} />
      </div>

    </div>

    {/* BUTTON */}
    <button onClick={handleLogin}>Login →</button>

    {/* PUSH CONTENT DOWN */}
    <div className="spacer"></div>

    <p className="auth-switch">
      Don't have an account?{" "}
      <span onClick={() => setMode("signup")}>
        Sign Up
      </span>
    </p>

  </div>
  </div>
);
}

export default Login;