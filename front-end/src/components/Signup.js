import { useState } from "react";
import API_URL from "../api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGlobe,
  FaCalendarAlt,
  FaEye
} from "react-icons/fa";

function Signup({ onAuthSuccess, setMode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSignup = async () => {
    const fullName = firstName + " " + lastName;

    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: fullName,
        email,
        password,
        firstName,
        lastName,
        country,
        dob
      })
    });

    const data = await res.json();

    if (data.user) {
      // STORE FULL USER OBJECT
      const fullUser = {
        ...data.user,
        firstName,
        lastName,
        country,
        dob
      };

      onAuthSuccess(fullUser);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="auth-card">

      <img src="/main_logo.png" className="auth-logo" alt="logo" />

      <h2>Create Account</h2>
      <p className="auth-sub">
        Join Vanuatu Centralized Booking System
      </p>

      {/* FIRST NAME */}
      <div className="input-box">
        <FaUser className="input-icon" />
        <input
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* LAST NAME */}
      <div className="input-box">
        <FaUser className="input-icon" />
        <input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* COUNTRY */}
      <div className="input-box">
        <FaGlobe className="input-icon" />
        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {/* DOB */}
      <div className="input-box">
        <FaCalendarAlt className="input-icon" />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div className="input-box">
        <FaEnvelope className="input-icon" />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
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

      <button onClick={handleSignup}>Sign Up →</button>

      {/* SWITCH */}
      <p className="auth-switch">
        Already have an account?{" "}
        <span onClick={() => setMode("login")}>
          Login
        </span>
      </p>

    </div>
  );
}

export default Signup;