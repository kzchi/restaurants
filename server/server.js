const express = require("express");
require("dotenv").config();
const db = require("./db");

const app = express();
// const morgan = require("morgan");

// app.use(morgan("dev"));

// // middleware
// app.use((req, res, next) => {
//     console.log("Hello from the middleware");
//     next();
// });

// retrieve data from body via middleware
app.use(express.json());

// Get all restaurants
app.get("/api/v1/res", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM res");
    console.log(results);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get one restaurant
app.get("/api/v1/res/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("SELECT * FROM res WHERE id = $1", [
      req.params.id,
    ]);
    console.log(results.rows[0]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a new restaurant
app.post("/api/v1/res", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO res (resname, locations, id) values ($1, $2, $3) returning *",
      [req.body.resname, req.body.locations, req.body.id]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update a restaurant
app.put("/api/v1/res/:id", async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const results = await db.query(
      "UPDATE res SET resname = $1, locations = $2 WHERE id = $3 returning *",
      [req.body.resname, req.body.locations, req.body.id]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete a restaurant
app.delete("/api/v1/res/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM res WHERE id = $1", [
      req.params.id,
    ]);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
