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
  connectionString: process.env.DATABASE_URL || "postgres://postgres:petit@localhost:5432/MajorProject_db",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
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
  const { name, email, password, firstName, lastName, country, dob } = req.body;

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
      (full_name, email, password, first_name, last_name, country, dob) 
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
        full_name AS name,
        email,
        first_name AS "firstName",
        last_name AS "lastName",
        country,
        dob,
        image
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

app.put("/update-profile", async (req, res) => {
  const { email, firstName, lastName, country, dob, image } = req.body;
  const fullName = firstName + " " + lastName;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET full_name = $1, first_name = $2, last_name = $3, country = $4, dob = $5, image = $6
       WHERE email = $7
       RETURNING id, full_name AS name, email, first_name AS "firstName", last_name AS "lastName", country, dob, image`,
      [fullName, firstName, lastName, country, dob, image, email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during profile update" });
  }
});