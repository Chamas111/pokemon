require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const pokemonsRouter = require("./routes/pokemons");
const pokemonsExternalRouter = require("./routes/extPokemons");
//const errorHandler = require("./middlewares/errorHandler");
const path = require("path");
const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/pokemons", pokemonsRouter);
app.use("/api/extpokemons", pokemonsExternalRouter);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
