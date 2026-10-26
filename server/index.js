require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movies");
const peopleRoutes = require("./routes/people");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/movies", movieRoutes);
app.use("/api/people", peopleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
