const express = require("express");
const Sector = require("../../models/Sector");

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
router.post("/sectors/add", (req, res) => {
  const { body } = req;
  const { name} = body;
  const newSector = new Sector({
    name
  });
  newSector
    .save()
    .then((result) => {
      if (result != null) {
        res.send({ success: true,newSector:result });
      } else {
        res.send({ success: false });
      }
    })
    .catch((err) => {
      res.send({ success: false });
    });
});
router.post("/user", (req, res) => {
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
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    })
    .catch((err) => {
      res.send({ success: false });
    });
});

module.exports = router;
