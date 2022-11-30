const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Sector = require("./models/Sector");
const User = require("./models/User");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//db config
app.get("/", (req, res) => {
  res.send("welcome 😊 !");
});
app.get("/api/sectors", (req, res) => {
  Sector.find()
    .then((sectors) => {
      res.send(sectors);
    })
    .catch((error) => {
      res.send({
        success: false,
        error,
      });
    });
});
app.get("/api/users", (req, res) => {
  User.find()
    .then((Users) => {
      res.send(Users);
    })
    .catch((error) => {
      res.send({
        success: false,
        error,
      });
    });
});
app.post("/api/sectors/add", (req, res) => {
  const { body } = req;
  const { name } = body;
  const newSector = new Sector({
    name,
  });
  newSector
    .save()
    .then((result) => {
      if (result != null) {
        res.send({ success: true, newSector: result });
      } else {
        res.send({ success: false });
      }
    })
    .catch((err) => {
      res.send({ success: false });
    });
});
app.post("/api/user/add", (req, res) => {
  const { body } = req;
  const { name, sectors, terms } = body;
  const newUser = new User({
    name,
    terms,
    sectors,
  });
  newUser
    .save()
    .then((result) => {
      if (result != null) {
        res.send({ success: true, _id: result._id });
      } else {
        console.log("gete");
        res.send({ success: false });
      }
    })
    .catch((err) => {
      res.send({ success: false, err });
    });
});
app.post("/api/user/edit", (req, res) => {
  const { _id, name, sectors } = req.body;
  if (_id) {
    User.findOneAndUpdate(
      { _id },
      { $set: { name: name, sectors: sectors } },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send({ success: true, updated: doc });
        } else {
          res.send({ success: false });
        }
      }
    );
  }
});
app.post("/api/user/check", (req, res) => {
  const { _id } = req.body;
  if (_id) {
    User.findById(_id)
      .then((result) => {
        if (result) {
          res.send({ success: true });
        } else {
          res.send({ success: false });
        }
      })
      .catch((err) => {
        res.send({ success: false });
      });
  }
});
app.post("/api/user/delete", (req, res) => {
  const { _id } = req.body;
  if (_id) {
    User.deleteOne({ _id })
      .then((result) => {
        if (result && result.deletedCount != 0) {
          res.send({ success: true });
        } else {
          res.send({ success: false, err: "no such user" });
        }
      })
      .catch((err) => {
        res.status(501).send({ success: false, err });
      });
  }
});

mongoose
  .connect(process.env.DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb Connected..."))
  .catch((err) => console.log(err));

//Listen On

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
