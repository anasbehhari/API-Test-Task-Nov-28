const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/", require("./router/api"));

//db config

mongoose
  .connect(process.env.DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

//Listen On

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
