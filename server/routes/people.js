const express = require("express");

const { search, movies } = require("../controllers/peopleController");

const router = express.Router();

router.get("/search", search);

router.get("/:id/movies", movies);

module.exports = router;
