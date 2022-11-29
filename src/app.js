require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, async (error) => {
  if (error) {
    console.error(error);
    return;
  }
  try {
    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hb1s7ws.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      mongoose.set("debug", true);

      console.log(`Server in running at PORT ${PORT}`);
    }
  } catch (error) {
    console.error(error);
  }
});
