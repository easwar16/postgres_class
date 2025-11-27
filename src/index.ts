import { Client } from "pg";
import express from "express";

const app = express();

app.use(express.json());

const pgClient = new Client(
  "postgresql://neondb_owner:npg_gLVyHhmwG0Q9@ep-polished-king-a4froz22-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);

pgClient.connect();

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    const user = await pgClient.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`,
      [username, email, password]
    );
    return res.status(200).json({ message: "User Created successfully" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.listen(3001, () => {
  console.log("Listening on 3000");
});
