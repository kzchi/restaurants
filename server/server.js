const express = require("express");
require("dotenv").config();
const db = require("./db");
const cors = require("cors");

const app = express();
const morgan = require("morgan");

// app.use(morgan("dev"));

// // middleware
// app.use((req, res, next) => {
//     console.log("Hello from the middleware");
//     next();
// });

// retrieve data from body via middleware
app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/res", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM res");

    const resRatingData = await db.query("select * from res left join (select res_id, count(*), trunc(AVG(rating), 1) as avg_rating from reviews group by res_id) reviews on res.id = reviews.res_id");

    console.log('res rating data',resRatingData);

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
  // console.log(req.params.id);

  try {
    const rest = await db.query("SELECT * FROM res WHERE id = $1", [
      req.params.id,
    ]);
    // console.log(results.rows[0]);

    const reviews = await db.query("SELECT * FROM reviews WHERE res_id = $1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: rest.rows[0],
        reviews: reviews.rows,
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
      "INSERT INTO res (resname, locations) values ($1, $2) returning *",
      [req.body.resname, req.body.locations]
    );
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
  try {
    const results = await db.query(
      "UPDATE res SET resname = $1, locations = $2 WHERE id = $3 returning *",
      [req.body.resname, req.body.locations, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
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

// add a review
app.post("/api/v1/res/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (res_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
