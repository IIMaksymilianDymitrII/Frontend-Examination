import express, { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

let db: any;

const SECRET: string = process.env.SECRET || "devsecret";

async function initDB() {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT
    )
  `);

  console.log("Database initialized");
}

app.post("/signin", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Email, password and name required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.run("INSERT INTO users (email, password, name) VALUES (?,?,?)", [
      email,
      hashedPassword,
      name,
    ]);

    res.status(201).json({
      message: "User has been created",
      user: { email, name },
    });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1h",
  });

 res.json({
  token,
  user: {
    email: user.email,
    name: user.name,
  },
});

});

app.get("/dashboard", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token provided" });

  const token = auth.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "Access granted", user: decoded });
  });
});
app.post("/google-login", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    return res.status(400).json({ error: "Email and name required" });

  let user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) {
    await db.run("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [
      email,
      "",
      name,
    ]);

    user = { email, name };
  }

  const token = jwt.sign({ email: user.email, name: user.name }, SECRET, {
    expiresIn: "1h",
  });

  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
    },
  });
});

app.post("/forgotpassword", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email required" });

  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(404).json({ error: "User not found" });

  const resetToken = jwt.sign({ email: user.email }, SECRET, {
    expiresIn: "15m",
  });

  res.json({ message: "Password reset token created", resetToken });
});

app.post("/resetpassword", async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword)
    return res.status(400).json({ error: "Token and new password required" });

  try {
    const decoded = jwt.verify(token, SECRET) as { email: string };
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.run("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      decoded.email,
    ]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

initDB().then(() => {
  app.listen(5000, () =>
    console.log("Server running on http://localhost:5000")
  );
});
