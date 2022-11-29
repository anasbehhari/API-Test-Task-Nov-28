const express = require("express");
const Sector = require("../../models/Sector");
const User = require("../../models/User");

const router = express.Router();

router.get("/sectors", (req, res) => {
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
router.get("/users", (req, res) => {
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
router.post("/sectors/add", (req, res) => {
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
router.post("/user/add", (req, res) => {
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

router.post("/user/check", (req, res) => {
  const { _id } = req.body;
  if (_id) {
    User.findById(_id)
    .then((result) => {
        if (result) {
          res.send({ success: true });
        } else {
          res.send({ success: false , err: "no such user"});
        }
    })
    .catch(err => {
        res.status(501).send({success:false,err})
    })
  }
});

module.exports = router;
