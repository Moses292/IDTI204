const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Allow requests from the deployed front-end and local development
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL // Set this on Render to your front-end URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Root route for health checks
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/accommodations", async (req, res) => {
  const result = await pool.query("SELECT * FROM accommodations");
  res.json(result.rows);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/car-rentals", async (req, res) => {
  const result = await pool.query("SELECT * FROM car_rentals");
  res.json(result.rows);
});

app.get("/tours", async (req, res) => {
  const result = await pool.query("SELECT * FROM tour_operators");
  res.json(result.rows);
});

app.post("/signup", async (req, res) => {
  const { name, email, password, firstName, lastName, Country, dob } = req.body;

  try {
    // check if user exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.json({ error: "User already exists" });
    }

    // insert user
    
const result = await pool.query(
      `INSERT INTO users 
      (name, email, password, first_name, last_name, country, dob) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [name, email, password, firstName, lastName, country, dob]
    );

    res.json({
      message: "Signup successful",
      user: result.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT 
        id,
        name,
        email,
        first_name AS "firstName",
        last_name AS "lastName",
        country,
        dob
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ error: "User not found" });
    }

    const user = result.rows[0];

    const passwordCheck = await pool.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );

    if (passwordCheck.rows[0].password !== password) {
      return res.json({ error: "Incorrect password" });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});