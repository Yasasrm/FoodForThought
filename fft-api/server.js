const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// USERS
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, role, points } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.users (name, role, points) VALUES ($1, $2, $3) RETURNING *",
      [name, role, points]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// CATEGORIES
app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.categories");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.products");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { cid, name } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.products (cid, name) VALUES ($1, $2) RETURNING *",
      [cid, name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DONATIONS
app.get("/donations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.donations");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/donations", async (req, res) => {
  try {
    const { topic, description, pid, qty, cost, due, filled, valid } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.donations (topic, description, pid, qty, cost, due, filled, valid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [topic, description, pid, qty, cost, due, filled, valid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// COLLECTIONS
app.get("/collections", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.collections");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/collections", async (req, res) => {
  try {
    const { uid, did, amount } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.collections (uid, did, amount) VALUES ($1, $2, $3) RETURNING *",
      [uid, did, amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POSTS
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM fdb.posts");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { uid, comment } = req.body;
    const result = await pool.query(
      "INSERT INTO fdb.posts (uid, comment) VALUES ($1, $2) RETURNING *",
      [uid, comment]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update/Delete
const entities = [
  "users",
  "categories",
  "products",
  "donations",
  "collections",
  "posts",
];
entities.forEach((entity) => {
  app.put(`/${entity}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const fields = Object.keys(req.body)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const values = Object.values(req.body);
      values.push(id);
      const result = await pool.query(
        `UPDATE fdb.${entity} SET ${fields} WHERE ${entity.slice(0, -1)}id = $${
          values.length
        } RETURNING *`,
        values
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  app.delete(`/${entity}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(
        `DELETE FROM fdb.${entity} WHERE ${entity.slice(0, -1)}id = $1`,
        [id]
      );
      res.json({ message: `${entity.slice(0, -1)} deleted successfully` });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
